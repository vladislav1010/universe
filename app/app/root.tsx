import {
  json,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix'
import type {LinksFunction} from 'remix'
import {useRemixI18Next} from 'remix-i18next'
import {i18n} from './i18n.server'
import Navbar from './components/navbar'
import tailwindStyles from './styles/tailwind.css'
import vendorStyles from './styles/vendors.css'
import appStyles from './styles/app.css'
import noScriptStyles from './styles/no-script.css'
import * as React from 'react'
import StylesContext from './StylesContext'

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap',
    },
    {rel: 'stylesheet', href: vendorStyles},
    {rel: 'stylesheet', href: tailwindStyles},
    {rel: 'stylesheet', href: appStyles},
  ]
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  const {locale} = useLoaderData<{locale: string}>()
  useRemixI18Next(locale)

  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

// TODO: customize below

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  const styles = React.useContext(StylesContext)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Links />
        {styles}
        <noscript>
          <link rel="stylesheet" href={noScriptStyles} />
        </noscript>
      </head>
      <body className="dark:bg-gray-900 bg-white transition duration-500">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

// IMPORTANT: all code relies on portals, that should be in the same stacking context as app inner stuff
function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export const loader: LoaderFunction = async ({request}) => {
  const locale = await i18n.getLocale(request)
  return json({locale})
}
