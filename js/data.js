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
  'Центр города',
  'Прекрасный вид из окна',
  'Рядом парк',
  'Все включено',
  'Для молодых семей',
  'Недалеко от пляжа',
  'Возле площади',
  'Новый ремонт',
  'Тихие соседи',
  'Удобная парковка',
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
  features: getRandomArrValues(FEATURES, getRandomInt(1, FEATURES.length - 1)),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getRandomArrValues(PHOTOS, getRandomInt(1, PHOTOS.length - 1)).map((photo) => `https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/${photo}`),

//title, строка — заголовок предложения. Придумайте самостоятельно.
//address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат как в объекте location (см. ниже) {{lat}}, {{lng}}.
//price, число — стоимость. Случайное целое положительное число.
//type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
//rooms, число — количество комнат. Случайное целое положительное число.
//guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
//checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
//checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
//features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
//description, строка — описание помещения. Придумайте самостоятельно.
//photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
});

const createLocation = () => ({
  lat: generateRandomFloat(LATITUDE_MIN, LATITUDE_MAX, DECIMAL_PLACES),
  lng: generateRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, DECIMAL_PLACES),
//объект — местоположение в виде географических координат. Состоит из двух полей:
//lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
//lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
});

const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(location),
  location: createLocation(),
});

const getAds = () => Array.from({ length: AD_COUNT}, () => createAd());

export { getAds };
