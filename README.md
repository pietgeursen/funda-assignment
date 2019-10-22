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
