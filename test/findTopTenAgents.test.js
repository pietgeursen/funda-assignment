const test = require("tape");
const findTopTenAgents = require("../lib/findTopTenAgents");

test("topTenAgents", function(t) {
  const agents = {
    agent1: 1,
    agent2: 10,
    agent3: 5,
    agent4: 9
  };

  const expected = [
    { name: "agent2", numListings: 10 },
    { name: "agent4", numListings: 9 },
    { name: "agent3", numListings: 5 },
    { name: "agent1", numListings: 1 }
  ];

  const actual = findTopTenAgents(agents);

  t.deepEqual(actual, expected);
  t.end();
});
