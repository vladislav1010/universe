import type {MetaFunction, LoaderFunction} from 'remix'
import {json} from 'remix'
import {i18n} from '../i18n.server'
import * as React from 'react'
import {
  FeedbackForm,
  action as feedbackFormAction,
  loader as feedbackFormLoader,
} from '../components/feedback-form'

export const action = feedbackFormAction

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async args => {
  const [_i18n, feedbackFormData] = await Promise.all([
    i18n.getTranslations(args.request, ['common', 'feedback']),
    feedbackFormLoader(args),
  ])

  // https://remix.run/api/remix#json
  return json({
    i18n: _i18n,
    ...feedbackFormData,
  })
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'It universe',
    description: 'Welcome to It universe!',
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  // TODO: remove color team className
  return (
    <main className="set-color-team-current-unknown">
      <FeedbackForm />
    </main>
  )
}
