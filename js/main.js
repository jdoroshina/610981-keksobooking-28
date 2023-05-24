import { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn } from './offer-form.js';
import { initMap, setStartAddress, setOnMapLoad, setOfferPinMarker } from './map.js';
import { showAlertMessage } from './show-message.js';
import { getData } from './api.js';

switchOfferFormOff();
switchFilterFormOff();
initMap();

const onGetDataSuccess = (offers) => {
  switchFilterFormOn();
  setOfferPinMarker(offers);
};

setOnMapLoad(() => {
  switchOfferFormOn();
  getData(onGetDataSuccess, showAlertMessage);
});

setStartAddress();
