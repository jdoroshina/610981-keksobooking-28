import { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn } from './offer-form.js';
import { initMap, setStartAddress, setOnMapLoad, setOfferPinMarker } from './map.js';
import { getAds } from './data.js';

switchOfferFormOff();
switchFilterFormOff();
initMap();
switchFilterFormOn();
setOfferPinMarker(getAds());
setOnMapLoad(switchOfferFormOn());
setStartAddress();
