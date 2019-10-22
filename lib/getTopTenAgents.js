require("dotenv").config();

const pull = require("pull-stream");
const PullPush = require("pull-pushable");

const findTopTenAgents = require("./findTopTenAgents");
const {
  RATE_LIMIT_REQUESTS_PER_MINUTE,
  PAGE_SIZE,
  BASE_URL
} = require("../config");

const fundaKey = process.env.FUNDA_KEY;
if (!fundaKey) {
  console.log("You must set an API key.");
  console.log(
    "Either edit the .env_example file and rename to .env, or set the `FUNDA_KEY` environment variable"
  );
  process.exit();
}
const requestUrl = `${BASE_URL}${fundaKey}/`;
const requestIntervalMillis = (1000 * 60) / RATE_LIMIT_REQUESTS_PER_MINUTE;

function getTopTenAgents({ request, updateProgress, withGardens }) {
  // This is a source stream that has a `push` method that can push new items to be emitted from the source.
  const pageNumberStream = PullPush();

  pull(
    pageNumberStream,
    // This is where we rate limit the number of requests.
    pull.asyncMap((data, cb) =>
      setTimeout(() => cb(null, data), requestIntervalMillis)
    ),
    // Here we map from the page number to a request options object that the `request` library can use.
    pull.map(page => createRequestOptions({ page })),

    // We use `asyncMap` to kick off the async api request.
    pull.asyncMap((options, cb) => request(options, cb)),

    // Selects the response body
    pull.map(response => response.body),
    // Parses the JSON
    pull.map(JSON.parse),
    // a `through` stream is a good place to do side effects. This doesn't transform the stream, it just makes a new request if needed.
    pull.through(body => {
      const resultsLength = body.Objects.length;
      if (resultsLength != 0) {
        const nextPage = body.Paging.HuidigePagina + 1;
        pageNumberStream.push(nextPage);
      } else {
        // There weren't any results so call `end` to close the stream
        pageNumberStream.end();
      }
    }),
    pull.through(body => {
      if (!updateProgress) return;
      const paging = body.Paging;

      current = paging.HuidigePagina;
      total = paging.AantalPaginas;
      updateProgress(current / total);
    }),
    // Select the Objects on the body
    pull.map(body => body.Objects),
    // We want to be able to work on each object in `Objects` so `flatten` them. The stream now emits once for each object.
    pull.flatten(),
    // Select the agent name from the object
    pull.map(object => object.MakelaarNaam),
    // Here we reduce down into an object keyed by the agent name with values of the number of their listings.
    pull.reduce(
      (sofar, makelaar) => {
        const newCount = (sofar[makelaar] | 0) + 1;
        sofar[makelaar] = newCount;
        return sofar;
      },
      {},
      (err, result) => {
        if (err) return console.error(err);
        console.log("top ten agents are:\n\n", findTopTenAgents(result));
      }
    )
  );

  // Start off the stream by requesting page 1
  pageNumberStream.push(1);

  function createRequestOptions({ page }) {
    return {
      uri: requestUrl,
      qs: {
        type: "koop",
        zo: `/amsterdam/${withGardens ? "tuin/" : ""}`,
        pagesize: PAGE_SIZE,
        page
      }
    };
  }
}

module.exports = getTopTenAgents;
