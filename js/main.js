import { getAds } from './data.js';
import { renderPopups } from './popup.js';
import { switchOfferFormOff, switchOfferFormOn, switchFilterFormOff, switchFilterFormOn } from './offer-form.js';
import './map.js';

renderPopups(getAds(1));

switchOfferFormOff();
switchFilterFormOff();

switchOfferFormOn();//удали позже
switchFilterFormOn();//удали позже
