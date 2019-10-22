const { table } = require("table");

const header = [["Agent Name", "Number of Listings"]];

config = {
  columns: {
    0: {
      alignment: "left",
      width: 100
    },
    1: {
      alignment: "center",
      width: 50
    }
  }
};

function printTopAgents({ agents }) {
  const data = agents.map(({ name, numListings }) => [name, numListings]);

  console.log(table([...header, ...data], config));
}

module.exports = printTopAgents;
