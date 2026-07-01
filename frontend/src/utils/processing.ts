export const formatPercent = (value: number) => {
  const formatted = value.toFixed(2);

  return formatted.replace(/\.00$/, "");
};
