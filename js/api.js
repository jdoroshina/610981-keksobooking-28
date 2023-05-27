const SERVER_URL_GET_DATA = 'https://28.javascript.pages.academy/keksobooking/data';
const SERVER_URL_POST = 'https://28.javascript.pages.academy/keksobooking';
const GET_ALERT_MESSAGE = 'Не удалось загрузить объявления.';
const SEND_ALERT_MESSAGE = 'Не удалось отправить объявление.';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(SERVER_URL_GET_DATA);

    if (!response.ok) {
      throw new Error(GET_ALERT_MESSAGE);
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      SERVER_URL_POST,
      {
        method: 'POST',
        body
      }
    );
    if (!response.ok) {
      throw new Error(SEND_ALERT_MESSAGE);
    }
    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};
export { getData, sendData };
