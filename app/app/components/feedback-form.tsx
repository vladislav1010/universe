import clsx from 'clsx'
import * as React from 'react'
import {useTranslation} from 'react-i18next'
import Checkbox from './checkbox'
import useInput from './use-input'
import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  styles,
  StylesProvider,
} from './form-control'
import {Input, Textarea} from './input'
import Radio from './radio'
import FileInput from './file-input'
import {
  Form,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix'
import type {ActionFunction} from 'remix'
import directCreatorUploadGetOneTimeUrl, {
  useDirectCreatorUploadImage,
} from '../lib/cloudflare/image/direct-creator-upload'
import type {DirectCreatorUploadSuccess} from '../lib/cloudflare/image/direct-creator-upload'
import imageDeliveryUrl, {
  variantNameTODOMeaning,
} from '../lib/cloudflare/image/image-delivery-url'
import deleteImage from '../lib/cloudflare/image/delete-image'
import Joi, {ValidationError} from 'joi'
import {Feedback, createFeedback as faunaCreateFeedback} from '../lib/faunadb'

// TODO: security
const createFeedback = async (feedback: Feedback) => {
  try {
    // TODO: messages
    const schema = Joi.object({
      name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z а-яёА-ЯЁ]{3,100}$'))
        .message('q'),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: {allow: ['com', 'net', 'ru']},
        })
        .message(''),
      aboutProject: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z а-яёА-ЯЁ0-9,.;'"\t\n\r()-]$/))
        .message(''),
    })

    schema.validate(feedback)

    await faunaCreateFeedback(feedback)
  } catch (err: unknown) {
    // TODO: What it it?
    return (err as ValidationError).details
  }
}

export const action: ActionFunction = async ({request}) => {
  const body = await request.formData()

  await createFeedback({
    name: (body.get('name') as string | null) ?? '',
    email: (body.get('email') as string | null) ?? '',
    cost: (body.get('cost') as string | null) ?? undefined,
    image: (body.get('image') as string | null) ?? undefined,
    interestedIn: body.getAll('interestedIn') as string[],
  })

  // TODO: don't wait for completion before giving a response
  await Promise.all(
    (body.getAll('imageIdToDelete') as string[]).map(imageId =>
      deleteImage(imageId),
    ),
  )
}

interface FeedbackFormData {
  feedback: {
    attachment: DirectCreatorUploadSuccess['result']
  }
  variantName: string
  ENV: {
    imageAccountHash: string
  }
}

export const loader: LoaderFunction = async () => {
  // TODO: There will be another request before page reload?
  const result = await directCreatorUploadGetOneTimeUrl()
  if (result.success) {
    const _: FeedbackFormData = {
      feedback: {
        attachment: result.result,
      },
      variantName: variantNameTODOMeaning,
      ENV: {
        imageAccountHash: process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH,
      },
    }

    return _
  } else {
    throw new Response('', {status: 500})
  }
}

const attachmentImageLayoutClassName = 'w-40 h-40 mt-4'

const interestedIn = [
  'Site from scratch',
  'Frontend development',
  'HTML/CSS coding',
]

const costs = ['1-10k', '20-30k', '30-40k']

function FeedbackForm() {
  const {t} = useTranslation('feedback')

  const {
    feedback,
    variantName,
    ENV: {imageAccountHash},
  } = useLoaderData<FeedbackFormData>()

  const [deletedImageIds, setDeletedImageIds] = React.useState<string[]>([])

  // TODO: There will be another request before page reload?
  const uploadImageResult = useDirectCreatorUploadImage()

  const transition = useTransition()

  const actionData = useActionData()

  const [aboutProjectValue, setAboutProjectValue] = React.useState(
    actionData?.values.aboutProject ?? '',
  )

  const {dispatchWithOnChange: costsDispatchWithOnChange, input: costsValue} =
    useInput<string | null>({
      initialInput: actionData?.values.cost ?? null,
    })

  return (
    <StylesProvider value={styles}>
      <Form className="flex flex-col space-y-4" method="post" action="/">
        <fieldset disabled={transition.state === 'submitting'}>
          <div className={styles.form?.container}>
            <h1 className={clsx('block text-left', styles.label)}>
              {t('form.interestedIn')}
            </h1>
            {interestedIn.map(title => (
              <Checkbox
                key={title}
                title={title}
                name="interestedIn[]"
                rootClassName="mr-4"
                initialInput={
                  actionData?.values.interestedIn.includes(title) ?? false
                }
              />
            ))}
          </div>
          <div className={styles.form?.container}>
            <h1 className={clsx('block text-left', styles.label)}>
              {t('form.costs')}
            </h1>
            {costs.map(title => (
              <Radio
                key={title}
                title={title}
                value={title}
                name="cost"
                id={`cost_${title}`}
                rootClassName="mr-4"
                isActive={title === costsValue}
                onClick={() => {
                  costsDispatchWithOnChange(title)
                }}
              />
            ))}
          </div>
          <FormControl
            id="name"
            isInvalid={
              actionData?.errors.name && transition.state !== 'submitting'
            }
          >
            <FormLabel>{t('form.name')}</FormLabel>
            <Input
              name="name"
              type="text"
              defaultValue={actionData?.values.name}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {actionData?.errors.name && transition.state !== 'submitting'
                ? actionData.errors.name
                : null}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="email"
            isInvalid={
              actionData?.errors.email && transition.state !== 'submitting'
            }
          >
            <FormLabel>{t('form.email')}</FormLabel>
            <Input
              name="email"
              type="email"
              defaultValue={actionData?.values.email}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {actionData?.errors.email && transition.state !== 'submitting'
                ? actionData.errors.email
                : null}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="aboutProject"
            isInvalid={
              actionData?.errors.aboutProject &&
              transition.state !== 'submitting'
            }
          >
            <FormLabel>{t('form.aboutProject')}</FormLabel>
            <Textarea
              name="aboutProject"
              value={aboutProjectValue}
              onChange={e => {
                setAboutProjectValue(e.target.value)
              }}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {actionData?.errors.aboutProject &&
              transition.state !== 'submitting'
                ? actionData.errors.aboutProject
                : null}
            </FormErrorMessage>
          </FormControl>
          <input
            type="hidden"
            value={
              uploadImageResult.isSuccess &&
              !deletedImageIds.includes(feedback.attachment.id)
                ? imageDeliveryUrl({
                    imageAccountHash,
                    variantName,
                    imageId: feedback.attachment.id,
                  })
                : ''
            }
            name="image"
          />
          {deletedImageIds.map(deletedImageId => (
            <input
              value={deletedImageId}
              name="imageIdToDelete[]"
              key={deletedImageId}
              type="hidden"
            />
          ))}
          <div>
            <button type="submit">
              {transition.state === 'submitting' ? 'Creating...' : 'Create'}
            </button>
          </div>
        </fieldset>
      </Form>
      {/* TODO: form control component is invalid */}
      <FormControl id="attachment" isInvalid={uploadImageResult.isError}>
        <FileInput
          name="attachment"
          onChange={e => {
            if (e.target.files?.[0]) {
              const formData = new FormData()
              formData.append(e.target.name, e.target.files[0])

              uploadImageResult.mutate([
                formData,
                feedback.attachment.uploadURL,
              ])
            }
          }}
        />
        <FormErrorMessage>
          <FormErrorIcon />
          {uploadImageResult.isError ? 'Произошла непредвиденная ошибка' : null}
        </FormErrorMessage>
      </FormControl>
      {uploadImageResult.isLoading ? (
        <div
          className={clsx(
            'animate-pulse bg-slate-200',
            attachmentImageLayoutClassName,
          )}
        />
      ) : uploadImageResult.isSuccess &&
        !deletedImageIds.includes(feedback.attachment.id) ? (
        <div className={clsx(attachmentImageLayoutClassName, 'relative')}>
          <div className="absolute inset-0 opacity-50 bg-stripes-gray" />
          <img
            className="object-contain object-center"
            src={imageDeliveryUrl({
              imageAccountHash,
              variantName,
              imageId: feedback.attachment.id,
            })}
            alt={`Изображение 1`}
          />
          <button
            className="absolute flex items-center justify-center h-7 w-7 border-2 rounded-full focus:outline-none overflow-hidden transition hover:border-primary focus:border-primary right-2 top-2"
            onClick={() => {
              setDeletedImageIds(x => [...x, feedback.attachment.id])
            }}
            type="button"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3" focusable="false">
              <g fill="currentColor">
                <path d="M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z" />
              </g>
            </svg>
            <span className="sr-only">Удалить</span>
          </button>
        </div>
      ) : null}
    </StylesProvider>
  )
}

export {FeedbackForm}
