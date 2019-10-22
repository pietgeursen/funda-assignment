#!/usr/bin/env node

const cli = require("cli");
const request = require("request");

const getTopTenAgents = require("./lib/getTopTenAgents");

const { withGardens } = cli.parse({
  withGardens: ["g", "Only properties that have gardens", "bool", false]
});

getTopTenAgents({ request, withGardens, updateProgress: cli.progress });
