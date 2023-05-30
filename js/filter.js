const OFFERS_COUNT = 10;

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

const filterByType = (housing, type) => type === 'any' || housing.offer.type === type;

const filterByPrice = (housing, price) => {
  if (price === 'any') {
    return true;
  } else if (price === 'low') {
    return housing.offer.price < Price.MIDDLE;
  } else if (price === 'middle') {
    return housing.offer.price >= Price.MIDDLE && housing.offer.price <= Price.HIGH;
  } else if (price === 'high') {
    return housing.offer.price > Price.HIGH;
  }
};

const filterByRooms = (housing, rooms) => rooms === 'any' || housing.offer.rooms === +rooms;

const filterByGuests = (housing, guests) => guests === 'any' || housing.offer.guests === +guests;

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
