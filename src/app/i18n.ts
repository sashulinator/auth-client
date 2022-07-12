import { languages, namespaces } from './i18n.constants'
import i18next, { i18n as i18nInstance } from 'i18next'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const createI18n = (language: string): i18nInstance => {
  // eslint-disable-next-line import/no-named-as-default-member
  const i18n = i18next.createInstance().use(initReactI18next)

  i18n
    .use(HttpApi) // Use backend plugin for translation file download.
    .init({
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // Specify where backend will find translation files.
      },
      lng: language,
      fallbackLng: language,
      ns: namespaces.common,
    })
    .catch(() => {
      console.error('Cannot load a translation file')
    })

  return i18n
}

export const i18n = createI18n(languages.ru)
