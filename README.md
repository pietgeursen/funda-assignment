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

## Test

```sh
$ npm test
```

## Features

- Rate limited
- Shows a progress bar
- Uses a .env file so that you don't accidentally commit the api key
- Has at least _some_ tests. The end to end test mocks the `request` library so the tests don't rely on the network
- Has a sane cli interface that would be easy to extend

## Thoughts and discussion

### Rate limiting

There other ways the rate limiting could be done to improve performance. One way would be to track the number of requests so far this minute and only limit when you cross that threshold. This has the down side that if you re-run the script again you'll exceed the limit.

### This is not the nicest way to do this

I spent a bit of time trying to find the api docs. I was expecting to find some query parameters that did the sorting for me. I guess it's part of the exercise to see how we solve this problem. But in the real world you'd do this all on the backend (assuming you had control over the backend) and expose some query parameters on the api eg.

```
/makelaars/amsterdam?orderBy=NumListingsDescending
```

### Pull streams vs other options

I like pull streams. They're like RxJs but a little more accessible. I love a functional approach and like solving these sorts of problems with combinations of `map` `filter` and `reduce`.

I also picked pull-streams because they're fun and a bit different. If I was writing this in a professional environment I'd probably use `async` / `await`. I think I could make a pretty tidy solution doing that. Or even just using RxJs.

