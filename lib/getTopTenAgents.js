require('dotenv').config()

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

async function getTopTenAgents ({ request, updateProgress, withGardens }) {
  var page = 1
  var objects = []

  while (1) {
    await asyncDelay(requestIntervalMillis)
    const requestOptions = createRequestOptions({ page, withGardens, uri: requestUrl, pagesize: PAGE_SIZE })
    const response = await asyncRequest({ options: requestOptions, request })

    const { Objects, Paging: { HuidigePagina: currentPage, AantalPaginas: totalPages } } = JSON.parse(response.body)

    if (Objects.length === 0) {
      break
    }

    if (updateProgress) {
      updateProgress(currentPage / totalPages)
    }

    objects = [...objects, ...Objects]

    page += 1
  }

  const agentCounts = objects
    .map(object => object.MakelaarNaam)
    .reduce((soFar, makelaar) => {
      const newCount = (soFar[makelaar] | 0) + 1
      soFar[makelaar] = newCount
      return soFar
    }, {})

  return sortAndSelectTopAgents(agentCounts)
}

function asyncDelay (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

function asyncRequest ({ request, options }) {
  return new Promise((resolve, reject) => {
    request(options, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

module.exports = getTopTenAgents
