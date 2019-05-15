import translations from './translations.json';

const translate = (string, language = 'nl') => {
  const translation = translations[language][string];
  return translation || string;
}

export default (() => window.translate = translate)();
