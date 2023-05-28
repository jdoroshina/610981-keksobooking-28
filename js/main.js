import { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn, setOnOfferFormSubmit, setOnFormReset, setOnResetButton } from './offer-form.js';
import { initMap, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap } from './map.js';
import { showSuccessMessage, showErrorMessage, showAlertMessage } from './show-message.js';
import { getData, sendData } from './api.js';

const onGetDataSuccess = (offers) => {
  switchFilterFormOn();
  setOfferPinMarker(offers);
  setOnResetButton(offers);
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
};

setOnOfferFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

setOnMapLoad();
switchOfferFormOn();
setStartAddress();
