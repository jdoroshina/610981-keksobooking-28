const getRandomInt = (minRandomValue, maxRandomValue) => {
  const lower = Math.ceil(Math.min(minRandomValue, maxRandomValue));
  const upper = Math.floor(Math.max(minRandomValue, maxRandomValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArrValues = (arr, valuesQuantity) => {
  const result = arr.slice(); // Создаем копию исходного arr
  result.sort(() => Math.random() - 0.5); // Сортируем массив случайным образом
  return result.slice(0, valuesQuantity); // Возвращаем первые valuesQuantity элементов
};

const getRandomUniqueArrValues = (arr, valuesQuantity) => {
  const result = arr.slice(); // Создаем копию исходного arr
  result.sort(() => Math.random() - 0.5); // Сортируем массив случайным образом
  const uniqueValues = [...new Set(result.slice(0, valuesQuantity))]; // Удаляем повторяющиеся значения
  return uniqueValues;
};

const generateRandomFloat = (minValue, maxValue, decimalPlaces) => {
  const randomValue = Math.random() * (maxValue - minValue) + minValue;
  return randomValue.toFixed(decimalPlaces);
};


const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getRandomInt, getRandomArrayElement, getRandomArrValues, getRandomUniqueArrValues, generateRandomFloat, isEscKey };
