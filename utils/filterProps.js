module.exports.filterProps = (obj, arr) => {
  return Object.keys(obj)
    .filter(key => !arr.includes(key))
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: obj[key],
      };
    }, {});
};
