#!/usr/bin/env node

require('dotenv').config()
const cli = require('cli')
const request = require('request')

const getTopTenAgents = require('./lib/getTopTenAgents')
const printTopAgents = require('./lib/printTopAgents.js')

const fundaKey = process.env.FUNDA_KEY
if (!fundaKey) {
  console.log('You must set an API key.')
  console.log(
    'Either edit the .env_example file and rename to .env, or set the `FUNDA_KEY` environment variable'
  )
  process.exit()
}
// if this is run with -g then `withGardens` will be set
// if it's run with -h / --help they get a useful help message.
const { withGardens } = cli.parse({
  withGardens: ['g', 'Only properties that have gardens', 'bool', false]
})

async function get () {
  const agents = await getTopTenAgents(
    { request, withGardens, updateProgress: cli.progress }
  )

  printTopAgents({ agents })
}

get()
