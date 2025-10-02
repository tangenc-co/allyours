import type { StrapiApp } from '@strapi/strapi/admin';
import './custom.css'; 
import allyoursLogo from './extensions/allyours.png';
export default {
  config: {
    locales: [
      
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    head: {
      favicon: allyoursLogo,
    },
    auth: {
      logo: allyoursLogo,
    },
    menu: {
      logo: allyoursLogo,
    },
    theme: {
      colors: {
        primary100: '#fafafa',
        primary200: '#fafafa',
        primary500: '#fafafa',
        primary600: '#fafafa',
        primary700: '#fafafa',
        danger700: '#fafafa',
      },
    },
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to Allyours',
        'Auth.form.welcome.subtitle': 'Log in to manage your content',
        'app.components.LeftMenu.navbrand.title': 'Allyours Admin', // For the left menu title
      }
    }
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
