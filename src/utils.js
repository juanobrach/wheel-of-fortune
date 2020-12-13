export const getRotationDegrees = (prizeNumber, numberOfPrizes) => {
  return (360 / numberOfPrizes) * (prizeNumber - 1);
};

export const randomOption = (options) =>
  Math.floor(Math.random() * options.length);
