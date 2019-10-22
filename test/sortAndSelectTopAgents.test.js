const test = require('tape')
const sortAndSelectTopAgents = require('../lib/sortAndSelectTopAgents')

test('topTenAgents orders the results correctly', function (t) {
  const agents = {
    agent1: 1,
    agent2: 10,
    agent3: 5,
    agent4: 9
  }

  const expected = [
    { name: 'agent2', numListings: 10 },
    { name: 'agent4', numListings: 9 },
    { name: 'agent3', numListings: 5 },
    { name: 'agent1', numListings: 1 }
  ]

  const actual = sortAndSelectTopAgents(agents)

  t.deepEqual(actual, expected, 'agents are in correct order')
  t.end()
})

test('topTenAgents only gets the top ten', function (t) {
  const agents = {
    agent1: 11,
    agent2: 10,
    agent3: 9,
    agent4: 8,
    agent5: 7,
    agent6: 6,
    agent7: 5,
    agent8: 4,
    agent9: 3,
    agent10: 2,
    agent11: 1
  }

  const actual = sortAndSelectTopAgents(agents)

  t.equal(actual.length, 10, 'selects only the top ten')
  t.end()
})

test("doesn't explode if passed an empty object", function (t) {
  const agents = {}
  t.doesNotThrow(() => {
    sortAndSelectTopAgents(agents)
    t.end()
  })
})
