const userBrowserLang = () => {
  let shortLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;
  if (shortLang.indexOf('-') !== -1) {
    shortLang = shortLang.split('-')[0];
  }

  if (shortLang.indexOf('_') !== -1) {
    shortLang = shortLang.split('_')[0];
  }
  //fallback
  if (!shortLang) {
    return 'en';
  }

  return shortLang;
};
export default userBrowserLang;
