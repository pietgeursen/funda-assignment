require('dotenv').config()

const pull = require('pull-stream')

const sortAndSelectTopAgents = require('./sortAndSelectTopAgents')
const createRequestOptions = require('./createRequestOptions')

const {
  RATE_LIMIT_REQUESTS_PER_MINUTE,
  PAGE_SIZE,
  BASE_URL
} = require('../config')

const fundaKey = process.env.FUNDA_KEY
const requestUrl = `${BASE_URL}${fundaKey}/`
const requestIntervalMillis = (1000 * 60) / RATE_LIMIT_REQUESTS_PER_MINUTE

function getTopTenAgents ({ request, updateProgress, withGardens }, cb) {
  pull(
    // This source streams emits numbers infinitely starting at 1
    pull.infinite(infinitePageNumbers()),
    // This is where we rate limit the number of requests.
    pull.asyncMap((data, cb) =>
      setTimeout(() => cb(null, data), requestIntervalMillis)
    ),
    // Here we map from the page number to a request options object that the `request` library can use.
    pull.map(page => createRequestOptions({ page, withGardens, uri: requestUrl, pagesize: PAGE_SIZE })),

    // We use `asyncMap` to start the async api request.
    // We're mapping from the request options into the response. Asynchronously.
    pull.asyncMap((options, cb) => request(options, cb)),

    // Selects the response body
    pull.map(response => response.body),
    // Parses the JSON
    pull.map(JSON.parse),

    // This is where we decide if we're done.
    // When this function returns false the stream ends.
    pull.take(body => {
      const resultsLength = body.Objects.length
      return resultsLength !== 0
    }),
    // We notify of our current progress if the function has been passed to us. This is a side effect and doesn't change the stream.
    pull.through(body => {
      if (!updateProgress) return
      const paging = body.Paging

      const current = paging.HuidigePagina
      const total = paging.AantalPaginas
      updateProgress(current / total)
    }),
    // Select the Objects on the body
    pull.map(body => body.Objects),
    // We want to be able to work on each object in `Objects` so `flatten` them. The stream now emits once for each object.
    pull.flatten(),
    // Select the agent name from the object
    pull.map(object => object.MakelaarNaam),
    // Here we reduce down into an object keyed by the agent name with values of the number of their listings.
    pull.reduce(
      (soFar, makelaar) => {
        const newCount = (soFar[makelaar] | 0) + 1
        soFar[makelaar] = newCount
        return soFar
      },
      {},
      (err, result) => {
        if (err) return cb(err)
        cb(null, sortAndSelectTopAgents(result))
      }
    )
  )
}

function infinitePageNumbers () {
  let pageNumber = 0
  return () => {
    pageNumber += 1
    return pageNumber
  }
}

module.exports = getTopTenAgents
