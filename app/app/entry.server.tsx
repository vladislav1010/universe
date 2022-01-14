import i18next from 'i18next'
import {renderToString} from 'react-dom/server'
import {initReactI18next} from 'react-i18next'
import type {EntryContext} from 'remix'
import {RemixServer} from 'remix'
import {RemixI18NextProvider} from 'remix-i18next'
import * as React from 'react'
import {ServerStyleSheet} from 'styled-components'
import StylesContext from './StylesContext'

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  // set up the Styled Components sheet
  const sheet = new ServerStyleSheet()

  // Here you also ned to initialize i18next using initReactI18next, you should
  // use the same configuration as in your client side.
  await i18next.use(initReactI18next).init({
    supportedLngs: ['ru', 'en'],
    defaultNS: 'common',
    fallbackLng: 'ru',
    react: {useSuspense: false},
  })

  // This render is thrown away, it's here simply to let styled components
  // extract the styles used

  // Then you can render your app wrapped in the RemixI18NextProvider as in the
  // entry.client file
  renderToString(
    sheet.collectStyles(
      <StylesContext.Provider value={null}>
        <RemixI18NextProvider i18n={i18next}>
          <RemixServer context={remixContext} url={request.url} />
        </RemixI18NextProvider>
      </StylesContext.Provider>,
    ),
  )

  // Now that we've rendered, we get the styles out of the sheet
  const styles = sheet.getStyleTags()
  sheet.seal()

  // Finally, we render a second time, but this time we have styles to apply,
  // make sure to pass them to `<StylesContext.Provider value>`
  const markup = renderToString(
    <StylesContext.Provider value={styles}>
      <RemixI18NextProvider i18n={i18next}>
        <RemixServer context={remixContext} url={request.url} />
      </RemixI18NextProvider>
    </StylesContext.Provider>,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
