import { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn, setOnOfferFormSubmit, setOnFormReset, setOnResetButton } from './offer-form.js';
import { initMap, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap, resetRegularPins } from './map.js';
import { showSuccessMessage, showErrorMessage, showAlertMessage } from './show-message.js';
import { getData, sendData } from './api.js';
import { getFilteredHousings, setOnFilterChange } from './filter.js';
import { debounce } from './utils.js';
import { resetAvatar } from './avatar.js';
import { resetImage } from './housing-image.js';

const RERENDER_DELAY = 500;

const onGetDataSuccess = (offers) => {
  switchFilterFormOn();
  setOfferPinMarker(getFilteredHousings(offers));
  setOnFilterChange(debounce(
    () => resetRegularPins(getFilteredHousings(offers)),
    RERENDER_DELAY
  ));
  setOnResetButton(getFilteredHousings(offers));
};

switchOfferFormOff();
switchFilterFormOff();
getData(onGetDataSuccess, showAlertMessage);
initMap();

const onSendDataSuccess = () => {
  showSuccessMessage();
  resetMap();
  setOnFormReset();
  setStartAddress();
  resetAvatar();
  resetImage();
};

setOnOfferFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

setOnMapLoad();
switchOfferFormOn();
setStartAddress();
