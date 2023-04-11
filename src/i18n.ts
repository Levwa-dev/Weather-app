import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationUA from './translations/ua.json'
import translationEN from './translations/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
        ua: {
            translations: translationUA
        },
        en: {
            translations: translationEN
        },
    },
    
    fallbackLng: localStorage.getItem('language') || 'ua',
    debug: false,
    keySeparator: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;