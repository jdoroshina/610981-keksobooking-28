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

export { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn };
