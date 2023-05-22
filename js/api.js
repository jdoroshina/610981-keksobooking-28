const SERVER_URL_GET_DATA = 'https://28.javascript.pages.academy/keksobooking/data';
// const SERVER_URL_POST = 'https://28.javascript.pages.academy/keksobooking';
const ERROR_TEXT = 'Не удалось загрузить данные. Попробуйте обновить страницу.';

const getData = () => fetch(SERVER_URL_GET_DATA)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(ERROR_TEXT);
  });

export { getData };
