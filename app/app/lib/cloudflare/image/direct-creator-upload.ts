import {useMutation} from 'react-query'

export interface DirectCreatorUploadUnknownError {
  type: 'Unknown'
  success: false
}

export interface DirectCreatorUploadSuccess {
  success: true
  result: {
    id: string
    uploadURL: string
  }
  result_info?: never
  messages?: never
  errors?: never
}

//TODO: What else is important?
type ApiResponse =
  | {
      result: {
        id: string
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
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/direct_upload`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    },
  )

  try {
    const data: ApiResponse = await response.json()

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

const useDirectCreatorUploadImage = () =>
  useMutation<void, unknown, [formData: FormData, uploadURL: string]>(
    ([formData, uploadURL]) =>
      fetch(uploadURL, {
        method: 'POST',
        body: formData,
      }).then(response => {
        // TODO:
        if (!response.ok) {
          throw new Error()
        }
      }),
    {},
  )

export {useDirectCreatorUploadImage}

export default directCreatorUploadGetOneTimeUrl
