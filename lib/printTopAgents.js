const { table } = require('table')

const header = [['Agent Name', 'Number of Listings']]

const config = {
  columns: {
    0: {
      alignment: 'left',
      width: 50
    },
    1: {
      alignment: 'center',
      width: 20
    }
  }
}

function printTopAgents ({ agents }) {
  const data = agents.map(({ name, numListings }) => [name, numListings])

  // Add a little space around the table.
  console.log('\n')
  console.log(table([...header, ...data], config))
}

module.exports = printTopAgents
