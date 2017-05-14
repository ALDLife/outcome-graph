# Outcome Graph

Library using Chart.js to create radar chart for visualising numerous therap sessions.

## Getting started

To create a radar chart, you need to pass in the id of a canvas `div` element, a title for the chart and the session data to be displayed.

```js

var outcomeGraph = require('outcome-graph');

var sessionChart = outcomeGraph.getOutcomeGraph("canvas", "Outcome Graph", sessionData);

```

