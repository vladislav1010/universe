import {createRequestHandler, handleAsset} from '@remix-run/cloudflare-workers'

import * as build from '../build'

const handleRequest = createRequestHandler({build})

const handleEvent = async event => {
  process.env.CLOUDFLARE_ACCOUNT_ID = CLOUDFLARE_ACCOUNT_ID
  process.env.CLOUDFLARE_IMAGES_TOKEN = CLOUDFLARE_IMAGES_TOKEN
  process.env.FAUNA_SECRET = FAUNA_SECRET
  process.env.FAUNA_DOMAIN = FAUNA_DOMAIN

  let response = await handleAsset(event, build)

  if (!response) {
    response = await handleRequest(event)
  }

  return response
}

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }

    event.respondWith(new Response('Internal Error', {status: 500}))
  }
})
