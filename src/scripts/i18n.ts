import { createI18n } from 'vue-i18n';
import trDe from '@/locales/de.json';
import trEn from '@/locales/en.json';
import trFr from '@/locales/fr.json';
import trEs from '@/locales/es.json';
import trCh from '@/locales/ch.json';
import trJa from '@/locales/ja.json';
import trUk from '@/locales/uk.json';
import trPt from '@/locales/pt.json';
// import trLt from '@/locales/lt.json';

export const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    de: trDe,
    en: trEn,
    fr: trFr,
    es: trEs,
    ch: trCh,
    ja: trJa,
    pt: trPt,
    uk: trUk,
    // lt: trLt,
  },
});
