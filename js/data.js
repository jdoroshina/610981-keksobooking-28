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
  'Уютное просторное и светлое помещение с современной бытовой техникой и стильными аксессуарами. Подойдёт для двух состоятельных людей, которые любят роскошь и ненавидят детей.',
  'Евроремонт, евродвушка, евроокна, евродвери. К оплате только евро.',
  'Дорогая мебель чехословакского производства, в отделке использованы лучшие экскрементальные материалы, отличные тихие соседи живут в соседнем районе.',
  'Лучшего места для ритуального самоубийства не найти! Комплиментами гостям являются подарочный набор ножей для харакири, книга «Придумываем хайку за 30 секунд», удобное белое кимоно и корзинка для головы. Группам скидки. ПРЕДОПЛАТА!',
  'Уникальное предложение на рынке! Дом с самым настоящим приведением! Нашего Каспера зовут дядя Стёпа. Жертва трагической любви к алкоголесодержащим напиткам. Ждите проказ от нашего домового в виде шатания мебели, сдачи в ломбард техники и невыключенной газовой плиты.',
  'Любите шумную музыку? Вечеринки на всю ночь? Ваше хобби изготовление скульптур из железобетона при помощи перфоратора? У вас есть коллекция шаров для боулинга, которой вы любите хвастать перед друзьями? Тогда эта квартира для вас!'
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
  photos: getRandomArrValues(PHOTOS, getRandomInt(1, PHOTOS.length)).map((photo) => `https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/${photo}`),
});

const createLocation = () => ({
  lat: generateRandomFloat(LATITUDE_MIN, LATITUDE_MAX, DECIMAL_PLACES),
  lng: generateRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, DECIMAL_PLACES),
});

const createAd = () => {
  const location = createLocation();
  return {
    author: createAuthor(),
    offer: createOffer(location),
    location,
  };
};

const getAds = (count) => Array.from({ length: count}, () => createAd());

export { getAds };
