const formatteNumberInput = (value: string | number) => {
  const result = Number(String(value).replaceAll(/[^0-9]+/g, ''));

  return result > 0 ? result : 0;
};

export { formatteNumberInput };
