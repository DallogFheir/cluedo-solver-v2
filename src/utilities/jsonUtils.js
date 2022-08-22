export const playerReplacer = (key, value) => {
  if (value instanceof Set) {
    return [...value];
  }

  return value;
};

export const playerReviver = (key, value) => {
  if (key === "cards" || key === "notCards") {
    return new Set(value);
  }

  return value;
};
