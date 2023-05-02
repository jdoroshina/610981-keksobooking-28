//Квартира для flat
//Бунгало для bungalow
//Дом для house
//Дворец для palace
//Отель для hotel
//В список .popup__features выведите все доступные удобства в объявлении.
//В блок .popup__description выведите описание объекта недвижимости offer.description.
//В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
//Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
//Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
//
//Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.
const HOUSING_TYPES_TITLES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const popupTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const container = document.querySelector('#map-canvas');

const createPopup = (author, offer) => {
  const popup = popupTemplate.cloneNode(true);

  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = `${offer.address} ₽/ночь`;
  popup.querySelector('.popup__text--price').textContent = offer.price;
  popup.querySelector('.popup__type').textContent = HOUSING_TYPES_TITLES[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.room} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popup.querySelector('.popup__features').textContent = offer.features;
  popup.querySelector('.popup__description').textContent = offer.description;
  popup.querySelector('.popup__avatar').src = author.avatar;

  return popup;
};

const renderPopups = (popups) => {
  const fragment = document.createDocumentFragment();
  popups.forEach((popup) => {
    const popupItem = createPopup(popup);
    fragment.append(popupItem);
  });

  container.append(fragment);
};

export { renderPopups };
