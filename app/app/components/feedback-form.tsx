import clsx from 'clsx'
import * as React from 'react'
import {useTranslation} from 'react-i18next'
import Checkbox from './checkbox'
import useInput from './use-input'
import {FormControl, FormLabel, styles, StylesProvider} from './form-control'
import {Input, Textarea} from './input'
import Radio from './radio'
import FileInput from './file-input'

const interestedIn = [
  'Site from scratch',
  'Frontend development',
  'HTML/CSS coding',
]

const costs = ['1-10k', '20-30k', '30-40k']

function FeedbackForm() {
  const {t} = useTranslation('feedback')

  const [aboutProjectValue, setAboutProjectValue] = React.useState('')

  const {dispatchWithOnChange: costsDispatchWithOnChange, input: costsValue} =
    useInput<string | null>({
      initialInput: null,
    })

  return (
    <form className="flex flex-col space-y-4">
      <StylesProvider value={styles}>
        <div className={styles.form?.container}>
          <h1 className={clsx('block text-left', styles.label)}>
            {t('form.interestedIn')}
          </h1>
          {interestedIn.map(title => (
            <Checkbox
              key={title}
              title={title}
              name={`interestedIn_${title}`}
              id={`interestedIn_${title}`}
              rootClassName="mr-4"
              initialInput={false}
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
        <FormControl id="name">
          <FormLabel>{t('form.name')}</FormLabel>
          <Input name="name" type="text" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>{t('form.email')}</FormLabel>
          <Input name="email" type="email" />
        </FormControl>
        <FormControl id="aboutProject">
          <FormLabel>{t('form.aboutProject')}</FormLabel>
          <Textarea
            name="aboutProject"
            value={aboutProjectValue}
            onChange={e => {
              setAboutProjectValue(e.target.value)
            }}
          />
        </FormControl>
        <div className={styles.form?.container}>
          <FileInput
            multiple
            name="attachment[]"
            onChange={e => {
              if (e.target.files?.[0]) {
                const data = new FormData()
                data.append('file', e.target.files[0])
              }
            }}
          />
        </div>
      </StylesProvider>
    </form>
  )
}

export {FeedbackForm}
