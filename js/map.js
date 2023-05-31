import { createPopup } from './popup.js';

const DEFAULT_ZOOM = 13;
const DefaultCoordinate = {
  lat: 35.683171,
  lng: 139.753143,
};

const map = L.map('map-canvas');

const addressElement = document.querySelector('#address');
addressElement.readOnly = true;

const setMap = () => {
  map.setView({
    lat: DefaultCoordinate.lat,
    lng: DefaultCoordinate.lng
  }, DEFAULT_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainPinMarker = L.marker(
  {
    lat: DefaultCoordinate.lat,
    lng: DefaultCoordinate.lng
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const regularPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setMainPinMarker = () => mainPinMarker.addTo(map);

const regularPinsGroup = L.layerGroup().addTo(map);

const setStartAddress = () => {
  addressElement.value = `${DefaultCoordinate.lat}, ${DefaultCoordinate.lng}`;
};

const setAddressOnPinMove = () => {
  mainPinMarker.on('moveend', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    addressElement.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  });
};

const setOfferPinMarker = (offers) => {
  offers.forEach((offer) => {
    const offerMarker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng
      },
      {
        icon: regularPinIcon
      }
    );
    offerMarker
      .addTo(regularPinsGroup)
      .bindPopup(createPopup(offer));
  });
};

const setOnMapLoad = (cb) => map.on('load', cb);

const initMap = () => {
  setMap();
  setMainPinMarker();
  setAddressOnPinMove();
};

const resetMap = () => {
  map.closePopup();
  map.setView({
    lat: DefaultCoordinate.lat,
    lng: DefaultCoordinate.lng
  }, DEFAULT_ZOOM);
  mainPinMarker.setLatLng({
    lat: DefaultCoordinate.lat,
    lng: DefaultCoordinate.lng
  });
};

const resetRegularPins = (offers) => {
  regularPinsGroup.clearLayers();
  setOfferPinMarker(offers);
};

export { initMap, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap, resetRegularPins };
