const makeClassString = (...classNames) => {
  return classNames.filter((className) => className).join(" ");
};

export default makeClassString;
