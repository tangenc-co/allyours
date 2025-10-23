import type { StrapiApp } from '@strapi/strapi/admin';
//import './custom.css'; 
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
        // Primary brand colors - using blue theme
        primary100: '#e6f3ff',
        primary200: '#b3d9ff', 
        primary500: '#0066cc',
        primary600: '#0052a3',
        primary700: '#003d7a',
        
        // Neutral colors
        neutral0: '#ffffff',
        neutral100: '#f6f6f9',
        neutral200: '#eaeaef',
        neutral300: '#dcdce4',
        neutral400: '#c0c0cf',
        neutral500: '#8e8ea9',
        neutral600: '#666687',
        neutral700: '#4a4a6a',
        neutral800: '#32324d',
        neutral900: '#212134',
        
        // Status colors
        success100: '#eafbe7',
        success500: '#5cb176',
        success600: '#328048',
        success700: '#2f6846',
        
        warning100: '#fdf4dc',
        warning500: '#f29d41',
        warning600: '#d9822f',
        warning700: '#be5d01',
        
        danger100: '#fcecea',
        danger500: '#ee5e52',
        danger600: '#d02b20',
        danger700: '#b72b1a',
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
