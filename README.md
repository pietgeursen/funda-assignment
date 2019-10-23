[![Build Status](https://travis-ci.com/pietgeursen/funda-assignment.svg?branch=master)](https://travis-ci.com/pietgeursen/funda-assignment)
# Funda Programming Assignment

## Install

```sh
$ git clone https://github.com/pietgeursen/funda-assignment
$ cd funda-assignment 
$ npm install
```

Rename the `.env_example` file to .env. Edit the file and set your funda api key.

## Run

### Find the agents with the most listings.

```sh
$ ./index
```

Will display something like: 

```
[##########################################################################] 100%

╔════════════════════════════════════════════════╤════════════════════════════════════════════════════╗
║ Agent Name                                     │                 Number of Listings                 ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ ERA Van De Steege                              │                         37                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Broersma Makelaardij                           │                         35                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Hoekstra en van Eck Amsterdam West             │                         27                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Hoekstra en van Eck Amsterdam Noord            │                         27                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Makelaardij Van der Linden Amsterdam           │                         24                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Makelaarsland                                  │                         20                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ RET Makelaars                                  │                         18                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Heeren Makelaars                               │                         18                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Von Poll Real Estate                           │                         16                         ║
╟────────────────────────────────────────────────┼────────────────────────────────────────────────────╢
║ Hallie & Van Klooster Makelaardij              │                         15                         ║
╚════════════════════════════════════════════════╧════════════════════════════════════════════════════╝
```

### Find the agents with the most listings with gardens.

```sh
$ ./index -g
```

### Print help message

```sh
$ ./index.js --help
```

Prints:

```
Usage:
  index.js [OPTIONS] [ARGS]

Options:
  -g, --withGardens BOOL Only properties that have gardens
  -h, --help             Display help and usage details
```

## Test

```sh
$ npm test
```

```
> npx standard && tape test/*.test.js

TAP version 13
# end to end
ok 1 progress gets called
ok 2 error is null
ok 3 there are two agents
ok 4 The agent with the most objects is first
ok 5 The agent has the correct number of listings
# if the request fails, getTopTenAgents should call back with error
ok 6 should be equal
# if the request succeeds but has an empty body, getTopTenAgents should call back with error
ok 7 Error is set
# topTenAgents orders the results correctly
ok 8 agents are in correct order
# topTenAgents only gets the top ten
ok 9 selects only the top ten
# doesn't explode if passed an empty object
ok 10 should not throw

1..10
# tests 10
# pass  10

# ok
```

## Add to the path (in development)

```sh
$ npm link
```

And then you can run this from anywhere with:

```sh
$ topTenFundaAgents -g
```

## Features

- Rate limited
- Shows a progress bar
- Uses a .env file so that you don't accidentally commit the api key
- Program exits with a helpful message if you don't provide an api key
- Has at least _some_ tests. The end to end test mocks the [`request`](https://www.npmjs.com/package/request) library so the tests don't rely on the network
- Has a sane cli interface that would be easy to extend
- Tests enforce coding style ([standard](https://standardjs.com/))
- [CI](https://travis-ci.com/pietgeursen/funda-assignment) is set up
- There is a separate [`config.json`](./config.json) where things like the rate limit can easily be changed
- Supports being added to the path

## Thoughts and discussion

### This is not the nicest way to do this

I spent a bit of time trying to find the api docs. I was expecting to find some query parameters that did the sorting for me. I guess it's part of the exercise to see how we solve this problem. But in the real world you'd do this all on the backend (assuming you had control over the backend) and expose some query parameters on the api eg.

```
/makelaars/amsterdam?orderBy=NumListingsDescending
```

### Rate limiting

There other ways the rate limiting could be done to improve performance. One way would be to track the number of requests so far this minute and only limit when you cross that threshold. This has the down side that if you re-run the script again you'll exceed the limit.

### Pull streams vs other options

I like [pull streams](https://pull-stream.github.io/). They're like [RxJs](https://rxjs-dev.firebaseapp.com/api) but a little more accessible. I love a functional approach and like solving these sorts of problems with combinations of `map` `filter` and `reduce`.

I also picked pull-streams because they're fun and a bit different. If I was writing this in a professional environment I'd probably use `async` / `await`. I think I could make a pretty tidy solution doing that. Or even just using RxJs.

### Ramda

I had a go at using [ramda](https://ramdajs.com/) in `sortAndSelectTopAgents.js`. I've only used it once or twice but it's a library that _seems_ fun and I want to learn it better. Again, for production, maybe I'd use [lodash](https://lodash.com/) because it's a bit more accessible. I think `ramda`'s functional style is a bit mind bendy when you're learning it (at least for me.)
