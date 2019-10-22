const test = require("tape");
const getTopTenAgents = require("../lib/getTopTenAgents");

test("end to end", function(t) {
  t.plan(6);
  getTopTenAgents(
    {
      request,
      updateProgress: () => {
        t.ok(true, "progress gets called");
      }
    },
    (err, result) => {
      t.error(err, "error is null");
      t.equal(result.length, 2, "there are two agents");
      t.equal(
        result[0].name,
        "Piet",
        "The agent with the most objects is first"
      );
      t.equal(
        result[0].numListings,
        2,
        "The agent has the correct number of listings"
      );
    }
  );
});

test("if the request fails, getTopTenAgents should call back with error", function(t) {
  const expectedError = Error("Bang!");
  const request = (opts, cb) => cb(expectedError);
  getTopTenAgents(
    { request, withGardens: true, updateProgress: () => {} },
    (err, result) => {
      t.equal(err, expectedError);
      t.end();
    }
  );
});

test("if the request succeeds but has an empty body, getTopTenAgents should call back with error", function(t) {
  const request = (opts, cb) => cb(null, {});
  getTopTenAgents(
    { request, withGardens: true, updateProgress: () => {} },
    (err, result) => {
      t.ok(err, "Error is set");
      t.end();
    }
  );
});

// A mock of the request function.
// I'd refactor this if it needed to be used more than once / was production code.
function request(opts, cb) {
  if (opts.qs.page == 1) {
    cb(null, {
      body: JSON.stringify({
        Paging: {
          HuidigePagina: 1,
          AantalPaginas: 2
        },
        Objects: [
          {
            MakelaarNaam: "Piet"
          },
          {
            MakelaarNaam: "Piet"
          },
          {
            MakelaarNaam: "Katie"
          }
        ]
      })
    });
  } else {
    cb(null, {
      body: JSON.stringify({
        Paging: {
          HuidigePagina: 1,
          AantalPaginas: 2
        },
        Objects: []
      })
    });
  }
}
