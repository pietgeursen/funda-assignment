const {
  toPairs,
  reverse,
  map,
  pipe,
  sortBy,
  prop,
  takeLast
} = require('ramda')

const sortByValues = sortBy(prop(1))
const takeLastTen = takeLast(10)
const topTen = pipe(
  toPairs, // converts { k: v } into [k,v]
  sortByValues, // sorts by by the value (the number of listings)
  takeLastTen, // The last ten will be the agents with the most listings (sorting is smallest to largest)
  reverse,
  map(([name, numListings]) => {
    return {
      name,
      numListings
    }
  })
)
// Expects an object with keys of strings and integer values.
// Returns an array of objects with keys `name` and `numListings`
function sortAndSelectTopAgents (agents) {
  return topTen(agents)
}

module.exports = sortAndSelectTopAgents
