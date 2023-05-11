const mapRoomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
const mapGuestsToRoom = {
  1: ['1', '2', '3 комнаты'],
  2: ['1', '2 комнаты'],
  3: ['3 комнаты'],
  0: ['100 комнат']
};

const mapAccomodationTypeToPrice = {
  bungaTow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const offerForm = document.querySelector('.ad-form');
const capacityElement = offerForm.querySelector('#capacity');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const offerFormSlider = offerForm.querySelector('.ad-form__slider');
const filterForm = document.querySelector('.map__filters');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const timeInElement = offerForm.querySelector('#timein');
const timeOutElement = offerForm.querySelector('#timeout');
const roomElement = offerForm.querySelector('#room_number');
const priceElement = offerForm.querySelector('#price');
const typeElement = offerForm.querySelector('#type');

priceElement.placeholder = mapAccomodationTypeToPrice[typeElement.value];

const pristine = new Pristine(offerForm,
  {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextTag: 'span',
    errorTextClass: 'text-help',
  },
  true
);

const switchOfferFormOff = () => {
  offerForm.classList.add('ad-form--disabled');
  offerFormSlider.classList.add('ad-form__slider--disabled');
  offerFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const switchOfferFormOn = () => {
  offerForm.classList.remove('ad-form--disabled');
  offerFormSlider.classList.remove('ad-form__slider--disabled');
  offerFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const switchFilterFormOff = () => {
  filterForm.classList.add('map__filters--disabled');
  filterFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const switchFilterFormOn = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

// Зависимость времени заселения и выселения
const onTimeInChange = () => {
  timeOutElement.value = timeInElement.value;
};
const onTimeOutChange = () => {
  timeInElement.value = timeOutElement.value;
};

timeInElement.addEventListener('change', onTimeInChange);
timeOutElement.addEventListener('change', onTimeOutChange);

// Проверка цены в зависимости от выбранного типа жилья
const priceCheck = (value) => Number.parseInt(value, 10) >= mapAccomodationTypeToPrice[typeElement.value];
const getPriceErrorMessage = () => `Стоимость должна быть выше ${mapAccomodationTypeToPrice[typeElement.value]}`;

pristine.addValidator(
  priceElement,
  priceCheck,
  getPriceErrorMessage,
);
const onPriceCheck = () => pristine.validate(priceElement);

priceElement.addEventListener('change', onPriceCheck);
typeElement.addEventListener('change', onPriceCheck);

const onTypeElementChange = () => {
  priceElement.placeholder = mapAccomodationTypeToPrice[typeElement.value];
};

typeElement.addEventListener('change', onTypeElementChange);

// Проверка количества комнат и количества гостей
const capacityCheck = () => mapRoomsToGuests[roomElement.value].includes(capacityElement.value);
const getСapacityElementErrorMessage = () => `Для такого количества гостей подойдёт ${mapGuestsToRoom[capacityElement.value].join(' или ')}`;

pristine.addValidator(
  capacityElement,
  capacityCheck,
  getСapacityElementErrorMessage
);

const getRoomElementErrorMessage = () => {
  if (roomElement.value === '100') {
    return 'Комнаты не для гостей';
  }
  return 'Для такого количества гостей нужно больше комнат';
};

pristine.addValidator(
  roomElement,
  capacityCheck,
  getRoomElementErrorMessage
);

const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

const onGuestsNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

roomElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn };
