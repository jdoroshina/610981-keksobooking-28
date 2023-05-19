const mapAccomodationTypetoCaption = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const popupTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const createPopup = ({author, offer}) => {
  const popup = popupTemplate.cloneNode(true);

  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = offer.address;
  popup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popup.querySelector('.popup__type').textContent = mapAccomodationTypetoCaption[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const offerDescriptionElement = popup.querySelector('.popup__description');
  offerDescriptionElement.textContent = offer.description;
  if (offerDescriptionElement.textContent === '') {
    offerDescriptionElement.classList.add('hidden');
  }

  popup.querySelector('.popup__avatar').src = author.avatar;

  const featureList = popup.querySelector('.popup__features');
  const featureItems = popup.querySelectorAll('.popup__feature');
  featureItems.forEach((item) => {
    const isMatch = offer.features.some((feature) => item.classList.contains(`popup__feature--${feature}`));

    if (!isMatch) {
      item.remove();
    }
  });
  if (offer.features.length === 0) {
    featureList.classList.add('hidden');
  }

  const popupPhotos = popup.querySelector('.popup__photos');
  const templateImg = popupPhotos.querySelector('img');
  popupPhotos.innerHTML = '';
  offer.photos.forEach((photoSrc) => {
    const img = templateImg.cloneNode(true); // создай копию тега <img> из шаблона
    img.src = photoSrc;
    popupPhotos.appendChild(img);
  });

  return popup;
};

export { createPopup };
