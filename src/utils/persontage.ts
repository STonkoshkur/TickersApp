export const percentageDiff = (firstValue: number, secondValue: number) => {
  const percentageDifferenceValue =
    ((secondValue - firstValue) / firstValue) * 100;

  const roundedValue = Number(percentageDifferenceValue.toFixed(2));

  return !isNaN(roundedValue) ? roundedValue : null;
};
