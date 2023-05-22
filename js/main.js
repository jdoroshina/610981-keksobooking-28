import { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn } from './offer-form.js';
import { initMap, setStartAddress, setOnMapLoad, setOfferPinMarker } from './map.js';
import { getData } from './api.js';

switchOfferFormOff();
switchFilterFormOff();
initMap();
switchFilterFormOn();
setOfferPinMarker(getData());
setOnMapLoad(switchOfferFormOn());
setStartAddress();
