const OFFERS_COUNT = 10;

const HousingType = {
  ANY: 'any',
  BUNGALOW: 'bungalow',
  FLAT: 'flat',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace',
};

const HousingPrice = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};

const HousingRooms = {
  ANY: 'any',
  ONE: '1',
  TWO: '2',
  THREE: '3',
};

const HousingGuests = {
  ANY: 'any',
  TWO: '2',
  ONE: '1',
  ZERO: '0',
};

const Price = {
  MIDDLE: 10000,
  HIGH: 50000
};

const offerFiltersForm = document.querySelector('.map__filters');
const housingType = offerFiltersForm.querySelector('#housing-type');
const housingPrice = offerFiltersForm.querySelector('#housing-price');
const housingRooms = offerFiltersForm.querySelector('#housing-rooms');
const housingGuests = offerFiltersForm.querySelector('#housing-guests');
const housingFeatures = offerFiltersForm.querySelectorAll('.map__checkbox');

const filterByType = (housing, type) => type === HousingType.ANY || housing.offer.type === type;

const filterByPrice = (housing, price) => {
  switch (price) {
    case HousingPrice.ANY:
      return true;
    case HousingPrice.LOW:
      return housing.offer.price < Price.MIDDLE;
    case HousingPrice.MIDDLE:
      return housing.offer.price >= Price.MIDDLE && housing.offer.price <= Price.HIGH;
    case HousingPrice.HIGH:
      return housing.offer.price > Price.HIGH;
  }
};

const filterByRooms = (housing, rooms) => rooms === HousingRooms.ANY || housing.offer.rooms === +rooms;

const filterByGuests = (housing, guests) => guests === HousingGuests.ANY || housing.offer.guests === +guests;

const filterByFeatures = (housing, features) => {
  if (!features.length) {
    return true;
  }
  if (!housing.offer.features) {
    return false;
  }
  return features.every((feature) => housing.offer.features.includes(feature));
};

const getFilteredHousings = (housings) => {
  const { value: selectedType } = housingType;
  const { value: selectedPrice } = housingPrice;
  const { value: selectedRooms } = housingRooms;
  const { value: selectedGuests } = housingGuests;

  const selectedFeatures = Array.from(housingFeatures)
    .filter((feature) => feature.checked)
    .map((feature) => feature.value);

  const filteredHousings = housings.filter((housing) => filterByType(housing, selectedType) &&
      filterByPrice(housing, selectedPrice) &&
      filterByRooms(housing, selectedRooms) &&
      filterByGuests(housing, selectedGuests) &&
      filterByFeatures(housing, selectedFeatures));

  return filteredHousings.slice(0, OFFERS_COUNT);
};


const setOnFilterChange = (cb) => {
  offerFiltersForm.addEventListener('change', () => {
    cb();
  });
};

export { getFilteredHousings, setOnFilterChange };
