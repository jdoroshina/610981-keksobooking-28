import { resetMap, resetRegularPins, setStartAddress } from './map.js';
import { resetAvatar } from './avatar.js';
import { resetImage } from './housing-image.js';

const MAX_PRICE = 100000;

const mapCountRoomsToCountGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
const mapCountGuestsToCountRooms = {
  1: ['1', '2', '3 комнаты'],
  2: ['2', '3 комнаты'],
  3: ['3 комнаты'],
  0: ['100 комнат']
};

const mapAccomodationTypeToPrice = {
  bungalow: 0,
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
const formSubmitButton = offerForm.querySelector('.ad-form__submit');
const formResetButton = offerForm.querySelector('.ad-form__reset');
const timeInElement = offerForm.querySelector('#timein');
const timeOutElement = offerForm.querySelector('#timeout');
const roomElement = offerForm.querySelector('#room_number');
const priceElement = offerForm.querySelector('#price');
const priceSliderElement = offerForm.querySelector('.ad-form__slider');
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

// Слайдер для инпута с ценой

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: 1000,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseInt(value, 10);
    },
    from: function (value) {
      return parseInt(value, 10);
    },
  }
});

priceSliderElement.noUiSlider.on('update', () => {
  priceElement.value = priceSliderElement.noUiSlider.get();
  pristine.validate(priceElement);
});

const onPriceChange = () => {
  priceSliderElement.noUiSlider.set(priceElement.value);
};

priceElement.addEventListener('input', onPriceChange);

const onTypeElementChangeSlider = () => {
  priceSliderElement.noUiSlider.updateOptions({
    range: {
      min: mapAccomodationTypeToPrice[typeElement.value],
      max: MAX_PRICE
    },
    start: mapAccomodationTypeToPrice[typeElement.value],
    step: 500
  });
  priceSliderElement.noUiSlider.set(priceElement.value);
};

typeElement.addEventListener('change', onTypeElementChangeSlider);

// Проверка количества комнат и количества гостей
const checkCapacity = () => mapCountRoomsToCountGuests[roomElement.value].includes(capacityElement.value);
const getСapacityElementErrorMessage = () => `Для такого количества гостей подойдёт ${mapCountGuestsToCountRooms[capacityElement.value].join(' или ')}`;

pristine.addValidator(
  capacityElement,
  checkCapacity,
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
  checkCapacity,
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

//Сброс формы
const setOnFormReset = () => {
  offerForm.reset();
  filterForm.reset();
  priceSliderElement.noUiSlider.reset();
  resetAvatar();
  resetImage();
};

const setOnResetButton = (offers) => {
  formResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setOnFormReset();
    pristine.reset();
    resetMap();
    setStartAddress();
    resetRegularPins(offers);
  });
};

//Отправка формы

const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = 'Опубликовать';
};

const setOnOfferFormSubmit = (cb) => {
  offerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      await cb(new FormData(offerForm));
      unblockSubmitButton();
    }
  });
};

export { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn, setOnOfferFormSubmit, setOnFormReset, setOnResetButton };
