export const variantNameTODOMeaning = 'public'

const imageDeliveryUrl = ({
  imageAccountHash,
  imageId,
  variantName,
}: {
  imageAccountHash: string
  imageId: string
  variantName: string
}) => `https://imagedelivery.net/${imageAccountHash}/${imageId}/${variantName}`

export default imageDeliveryUrl
