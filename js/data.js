import { getRandomInt, getRandomArrayElement, getRandomArrValues, generateRandomFloat, getRandomUniqueArrValues } from './utils.js';

const AVATAR_COUNT = 10;
const PRICE_MIN = 10000;
const PRICE_MAX = 150000;
const ROOMS_MAX = 10;
const GUESTS_MAX = 8;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const DECIMAL_PLACES = 5;
const AD_COUNT = 10;

const TITLES = [
  'Уютное гнездышко',
  'Комфортное место',
  'Удобное жилье',
  'Рай для отдыха',
  'Комфортабельные апартаменты',
  'Прекрасный вид',
  'Тихое пристанище',
  'Красивый дом',
  'Новое жилище',
  'Высший класс',
];

const ACCOMODATION_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Что привлекает внимание, так это роскошная обстановка. Помещение довольно маленькое. Здесь довольно чисто и садиться за стол можно без боязни испачкать одежду.',
  'Неплохое заведение - тут явно можно хорошо отдохнуть. Помещение довольно маленькое. Видно, что тут убирают, но не часто.',
  'Заведение ничем не выделяется из десятков других. Помещение совсем небольшое. Здесь довольно чисто и садиться за стол можно без боязни испачкать одежду.',
  'Сразу бросается в глаза, что тут очень скудное убранство Помещение среднего размера. Обслуживание вполне приемлемое - по крайней мере за посетителями подметают крошки со столов.',
  'Помещение совсем небольшое. Обслуживание вполне приемлемое',
  'Здесь немного неряшливо, но на это можно закрыть глаза.',
  'Поговаривают в народе, что тут вроде бы древний могильник, да и место плохое. Также говорят, что из-под поверхности земли здесь, в некоторые ночи раздается странный гул.',
  'Старики рассказывают, что здесь находятся врата в древний лабиринт. Ходят слухи, что феи и странные порождения теней встречаются здесь чаще, чем хотелось бы.',
  'В книгах пишут, что великий храм прошлых дней возвышался тут в незапамятные времена. Кроме легенд и россказней местных, ничего особенного здесь никогда и не происходило.',
  'Люди приходят сюда искать исцеления, а большие празднества обычно совершаются в новолуние. Ходят слухи, что здесь порой можно услышать странные голоса.',
];

const PHOTOS = [
  'duonguyen-8LrGtIxxa4w.jpg',
  'brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAuthor = () => ({
  avatar: `img/avatars/user${getRandomInt(1, AVATAR_COUNT).toString().padStart(2, '0')}.png`
});

const createOffer = (location) => ({
  title: getRandomArrayElement(TITLES),
  address: `${location.lat}, ${location.lng}`,
  price: getRandomInt(PRICE_MIN, PRICE_MAX),
  type: getRandomArrayElement(ACCOMODATION_TYPE),
  rooms: getRandomInt(1, ROOMS_MAX),
  guests: getRandomInt(1, GUESTS_MAX),
  checkin: getRandomArrayElement(CHECKIN_TIME),
  checkout: getRandomArrayElement(CHECKOUT_TIME),
  features: getRandomUniqueArrValues(FEATURES, getRandomInt(1, FEATURES.length - 1)),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getRandomArrValues(PHOTOS, getRandomInt(1, PHOTOS.length - 1)).map((photo) => `https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/${photo}`),
});

const createLocation = () => ({
  lat: generateRandomFloat(LATITUDE_MIN, LATITUDE_MAX, DECIMAL_PLACES),
  lng: generateRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, DECIMAL_PLACES),
});

const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(location),
  location: createLocation(),
});

const getAds = () => Array.from({ length: AD_COUNT}, () => createAd());

export { getAds };
