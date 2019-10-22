#!/usr/bin/env node

const cli = require('cli')
const request = require('request')

const getTopTenAgents = require('./lib/getTopTenAgents')
const printTopAgents = require('./lib/printTopAgents.js')

// if this is run with -g then `withGardens` will be set
// if it's run with -h / --help they get a useful help message.
const { withGardens } = cli.parse({
  withGardens: ['g', 'Only properties that have gardens', 'bool', false]
})

getTopTenAgents(
  { request, withGardens, updateProgress: cli.progress },
  (err, agents) => {
    if (err) return console.error(err)
    printTopAgents({ agents })
  }
)
