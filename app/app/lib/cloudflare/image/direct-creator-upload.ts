import {useMutation} from 'react-query'

export interface DirectCreatorUploadUnknownError {
  type: 'Unknown'
  success: false
}

export interface DirectCreatorUploadSuccess {
  success: true
  result: {
    uploadURL: string
  }
  result_info?: never
  messages?: never
  errors?: never
}

//TODO: What else is important?
type GetOneTimeUrlApiResponse =
  | {
      result: {
        uploadURL: string
      }
      success: true
    }
  | {
      success: false
    }

const directCreatorUploadGetOneTimeUrl = async (): Promise<
  DirectCreatorUploadUnknownError | DirectCreatorUploadSuccess
> => {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/direct_upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_TOKEN}`,
        },
      },
    )

    const data: GetOneTimeUrlApiResponse = await response.json()

    if (data.success) {
      const {success, result} = data
      return {
        result,
        success,
      }
    } else {
      return {
        type: 'Unknown',
        success: false,
      }
    }
  } catch (err: unknown) {
    return {
      type: 'Unknown',
      success: false,
    }
  }
}

interface UploadImageSuccessApiResponse {
  success: true
  result: {
    id: string
    variants: [string]
  }
}

const useDirectCreatorUploadImage = () =>
  useMutation<
    {id: string; url: string},
    unknown,
    [formData: FormData, uploadURL: string]
  >(
    ([formData, uploadURL]) =>
      fetch(uploadURL, {
        method: 'POST',
        body: formData,
      }).then(async response => {
        // TODO:
        if (!response.ok) {
          throw new Error()
        }

        const data: UploadImageSuccessApiResponse = await response.json()

        return {id: data.result.id, url: data.result.variants[0]}
      }),
    {},
  )

export {useDirectCreatorUploadImage}

export default directCreatorUploadGetOneTimeUrl
