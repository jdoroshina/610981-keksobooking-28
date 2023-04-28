const getRandomInt = (minRandomValue, maxRandomValue) => {
  const lower = Math.ceil(Math.min(minRandomValue, maxRandomValue));
  const upper = Math.floor(Math.max(minRandomValue, maxRandomValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export { getRandomInt, getRandomArrayElement, createIdGenerator };
