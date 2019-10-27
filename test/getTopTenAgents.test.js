const test = require('tape')
const getTopTenAgents = require('../lib/getTopTenAgents')

test('end to end', async function (t) {
  const result = await getTopTenAgents(
    {
      request,
      updateProgress: () => {
        t.ok(true, 'progress gets called')
      }
    }
  )
  t.equal(result.length, 2, 'there are two agents')
  t.equal(
    result[0].name,
    'Piet',
    'The agent with the most objects is first'
  )
  t.equal(
    result[0].numListings,
    2,
    'The agent has the correct number of listings'
  )
  t.end()
})

test('if the request fails, getTopTenAgents should call back with error', async function (t) {
  t.plan(1)
  const expectedError = Error('Bang!')
  const request = (opts, cb) => cb(expectedError)

  try {
    await getTopTenAgents(
      { request, withGardens: true, updateProgress: () => {} }
    )
  } catch (e) {
    t.equal(e, expectedError)
    t.end()
  }
})

test('if the request succeeds but has an empty body, getTopTenAgents should call back with error', async function (t) {
  const request = (opts, cb) => cb(null, {})

  try {
    await getTopTenAgents(
      { request, withGardens: true, updateProgress: () => {} }
    )
  } catch (e) {
    t.ok(e)
    t.end()
  }
})

// A mock of the request function.
// I'd refactor this if it needed to be used more than once / was production code.
function request (opts, cb) {
  if (opts.qs.page === 1) {
    cb(null, {
      body: JSON.stringify({
        Paging: {
          HuidigePagina: 1,
          AantalPaginas: 1
        },
        Objects: [
          {
            MakelaarNaam: 'Piet'
          },
          {
            MakelaarNaam: 'Piet'
          },
          {
            MakelaarNaam: 'Katie'
          }
        ]
      })
    })
  } else {
    cb(null, {
      body: JSON.stringify({
        Paging: {
          HuidigePagina: 1,
          AantalPaginas: 1
        },
        Objects: []
      })
    })
  }
}
