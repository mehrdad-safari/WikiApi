/**
 * function to create a query string form object.
 * @function obj2query
 * @param {obj} obj - query params as object.
 * @return {String}
 */
export const obj2query = (obj) => {
  const queryString = Object.keys(obj).reduce((acc, key, index) => {
    var seprator, val;
    seprator = index === 0 ? '?' : '&';
    key = encodeURIComponent(key);
    val = encodeURIComponent(obj[key]);
    return [acc, seprator, key, '=', val].join('');
  }, '');

  return queryString;
};

/**
 * Async function for retrive api data.
 * @function fetchApi
 * @param {String} lang - Language ISO code .
 * @param {obj} param - query parameter as Object
 * @return {obj}
 */
const fetchApi = async (lang = 'en', pageTitle) => {
  let apiUrl = `https://${lang}.wikipedia.org/w/api.php`;
  let queryParams = {
    action: 'parse',
    format: 'json',
    origin: '*',
    page: 'Albert_Einstein',
    prop: 'text|langlinks',
  };

  if (pageTitle) {
    queryParams.page = pageTitle;
  }
  queryParams = obj2query(queryParams);
  try {
    const res = await fetch(`${apiUrl}${queryParams}`);
    let data = await res.json();
    return data;
  } catch (error) {
    return {
      wikipediaData: { error: { info: 'Some thing happend: ' + error } },
    };
  }
};

export default fetchApi;
