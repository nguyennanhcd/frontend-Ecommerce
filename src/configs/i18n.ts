import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend)
  // Enable automatic language detection
  .use(LanguageDetector)
  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: 'vi',
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    fallbackLng: 'vi',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n

export const getLanguageOptions = () => [
  {
    lang: i18n.t('vietnamese'),
    value: 'vi'
  },
  {
    lang: i18n.t('english'),
    value: 'en'
  }
]
