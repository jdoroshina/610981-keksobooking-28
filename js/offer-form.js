const offerForm = document.querySelector('.ad-form');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const offerFormSlider = offerForm.querySelector('.ad-form__slider');
const filterForm = document.querySelector('.map__filters');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
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
