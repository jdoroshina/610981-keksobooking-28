import { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn } from './offer-form.js';
import { initMap, setStartAddress, setOnMapLoad, setOfferPinMarker } from './map.js';
import { showAlertMessage } from './show-message.js';
import { getData } from './api.js';

const onGetDataSuccess = (offers) => {
  switchFilterFormOn();
  setOfferPinMarker(offers);
};

switchOfferFormOff();
switchFilterFormOff();
getData(onGetDataSuccess, showAlertMessage);
initMap();
setOnMapLoad();
switchOfferFormOn();
setStartAddress();
