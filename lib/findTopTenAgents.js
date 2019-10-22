const {
  toPairs,
  reverse,
  map,
  pipe,
  sortBy,
  prop,
  takeLast
} = require("ramda");
// Expects an object with keys of strings and integer values.
// Returns an array of objects with keys `name` and `numListings`
function findTopTenAgents(agents) {
  const sortByValues = sortBy(prop(1));
  const takeLastTen = takeLast(10);
  const topTen = pipe(
    toPairs,
    sortByValues,
    takeLastTen,
    reverse,
    map(([name, numListings]) => {
      return {
        name,
        numListings
      };
    })
  );
  return topTen(agents);
}

module.exports = findTopTenAgents;
