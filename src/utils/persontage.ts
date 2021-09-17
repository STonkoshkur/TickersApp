export const percentageDiff = (firstValue: number, secondValue: number) => {
  const percentageDifferenceValue =
    ((secondValue - firstValue) / firstValue) * 100;

  return Number(percentageDifferenceValue.toFixed(2));
};
