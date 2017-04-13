`use strict`

var moment = require('moment');
var Chart = require('chart.js');
var randomColor = requrie('randomcolor');

function createOutcomeGraph(div, title, data){
  var chartConfig = createConfig(data,title);
  return new Chart(document.getElementById(div), chartConfig);
}

function createConfig(data, title){
  return {
    type: 'radar',
    data: sessionsConverter.getChartJSConvertedData(data),
    options: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title
      },
      scale: {
        ticks: {
          beginAtZero: true
        }
      },
      tooltips:{
        enabled:true,
        callbacks:{
          label: function(tooltipItem, data){
            var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
            //This will be the tooltip.body
            return datasetLabel + ': ' + tooltipItem.yLabel +': '+ data.datasets[tooltipItem.datasetIndex].notes[tooltipItem.index];
          }
        }
      }
    }
  };
}

module.exports.createOutcomeGraph = createOutcomeGraph;
