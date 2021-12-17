import {RemixI18Next, FileSystemBackend} from 'remix-i18next'

const backend = new FileSystemBackend('./public/locales')

export const i18n = new RemixI18Next(backend, {
  fallbackLng: 'ru',
  supportedLanguages: ['en', 'ru'],
})
