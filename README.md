# Outcome Graph  

[![npm](https://img.shields.io/npm/v/@ald-life/outcome-graph.svg)](http://www.npmjs.com/package/@ald-life/outcome-graph)

Library using Chart.js to create radar chart for visualising numerous therapy sessions.

## Getting started

To create a radar chart, you need to pass in the id of a canvas `div` element, a title for the chart and the session data to be displayed.

```js

var outcomeGraph = require('@ald-life/outcome-graph');

var sessionChart = outcomeGraph.getOutcomeGraph("canvas", "Outcome Graph", sessionData);

```

### Data format

Data will be expected as an array of therapy sessions. Each session is expected to have a timestamp for when it was conducted and will contain an array of outcomes. Each outcome item in this array will have a dimension, its value and possible notes related to this value.  

An example of the test data format is as follows: 

```json

[{
  "timestamp": "2017-02-18T14:58:54.026Z",
  "outcomes": [{
    "outcome": "Happiness",
    "value": 8,
    "notes": "I am pretty happy"
  }, {
    "outcome": "Loneliness",
    "value": 1,
    "notes": "I am isolated"
  }, {
    "outcome": "Health",
    "value": 5
  }, {
    "outcome": "Managing at Home",
    "value": 2
  }, {
    "outcome": "Finances",
    "value": 4
  }, {
    "outcome": "Work",
    "value": 10
  }],
  "notes": "Agreed the session went well"
}, {
  "timestamp": "2017-03-18T20:58:54.026Z",
  "outcomes": [{
    "outcome": "Happiness",
    "value": 10,
    "notes": "Joined social club"
  }, {
    "outcome": "Loneliness",
    "value": 3
  }, {
    "outcome": "Health",
    "value": 4
  }, {
    "outcome": "Managing at Home",
    "value": 3
  }, {
    "outcome": "Finances",
    "value": 5
  }, {
    "outcome": "Work",
    "value": 8,
    "notes": "Was late one day"
  }]
}, {
  "timestamp": "2017-04-15T08:58:54.026Z",
  "outcomes": [{
    "outcome": "Happiness",
    "value": 10
  }, {
    "outcome": "Loneliness",
    "value": 4
  }, {
    "outcome": "Health",
    "value": 5
  }, {
    "outcome": "Managing at Home",
    "value": 4
  }, {
    "outcome": "Finances",
    "value": 8,
    "notes": "Won at bingo"
  }, {
    "outcome": "Work",
    "value": 9
  }, {
    "outcome": "Relationships",
    "value": 7
  }],
  "notes": "Discharged"
}]

```

## Contributing

Before submitting a pull request, please take a moment to look over the [contributing guidelines](CONTRIBUTING.md) first.

## License

`@ald-life/outcome-graph` is available under the [MIT License](https://opensource.org/licenses/MIT)
