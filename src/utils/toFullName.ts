import { useTranslation } from 'react-i18next'

export const toFullName = (lastName: string, middleName: string, firstName: string) => {
  const { i18n } = useTranslation()
  if (i18n.language === 'vi') {
    return `${lastName ? lastName : ''} ${middleName ? middleName : ''} ${firstName ? firstName : ''}`
  } else if (i18n.language === 'en') {
    return `${middleName ? middleName : ''} ${firstName ? firstName : ''} ${lastName ? lastName : ''}`
  }
}
