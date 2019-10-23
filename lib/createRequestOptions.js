// This function maps all the request options to an object that
// the `request` module expects.
module.exports = function createRequestOptions ({ page, withGardens, uri, pagesize }) {
  return {
    uri,
    qs: {
      type: 'koop',
      zo: `/amsterdam/${withGardens ? 'tuin/' : ''}`,
      pagesize,
      page
    }
  }
}
