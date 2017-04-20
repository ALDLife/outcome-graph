(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.outcomeGraph = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
'use strict'

var Chart = require('chart.js');
var sessionsConverter = require('./sessionsConverter.js')();

function getOutcomeGraph(div, title, data){
  var chartConfig = getConfig(data,title);
  return new Chart(document.getElementById(div), chartConfig);
}

function getConfig(data, title){
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
            return datasetLabel + ' : ' + tooltipItem.yLabel +' : '+ data.datasets[tooltipItem.datasetIndex].notes[tooltipItem.index];
          }
        }
      }
    }
  };
}

module.exports.getOutcomeGraph = getOutcomeGraph;

},{"./sessionsConverter.js":3,"chart.js":1}],3:[function(require,module,exports){
'use strict'

var color = require('chartjs-color');
var moment = require('moment');
var distinctColors = require('distinct-colors')

// module pattern
module.exports = function (){
  // variable to keep track of different labels
  var labels = [];
  // labels set for checking if label is unique
  var labelSet = {};

  function init(){
    labels = [];
    labelSet = {};
  }

  function getConvertedSessions(sessions){
    var convertedSessions = [];
    // get distinct colours of all the different ones we could have
    var differentColours = distinctColors({count: sessions.length});
    sessions.forEach(function(session){
      //remove the first element each time
      var sessionColour = differentColours.splice(0, 1)[0];
      convertedSessions.push(getConvertedSession(session, sessionColour));
    });
    return convertedSessions;
  }

  function getConvertedSession(session, chartColour){
    var now = moment(); // current time

    var outcomes = session.outcomes;
    // data set item for session
    var convertedSession = {};

    var momentTimestamp = moment(session.timestamp);
    var humanisedTimestamp = moment.duration(momentTimestamp.diff(now)).humanize(true);

    convertedSession.label = humanisedTimestamp;

    // adding the values map to converted session for developer to view for possible debugging
    convertedSession.valuesMap = getValuesMapsFromOutcomes(outcomes);

    // extract data and notes arrays
    var extractedDataAndNotes = getExtractedDataAndTooltipNotes(convertedSession.valuesMap);
    convertedSession.data = extractedDataAndNotes.data;
    convertedSession.notes = extractedDataAndNotes.notes;

    var colour = color().rgb(chartColour.rgba()).rgbString();
    convertedSession.backgroundColor = color(colour).alpha(0.2).rgbString();
    convertedSession.borderColor = colour;
    convertedSession.pointBackgroundColor = colour;
    
    return convertedSession;
  }

  // this creates a mapping of the data value as well as notes for each label
  // to be later used to create the ChartJS data array
  function getValuesMapsFromOutcomes(outcomes){
    var dataMap = {};
    var noteMap = {};
    // add each outcome to a set
    outcomes.forEach(function(outcome){
      var lowerCaseLabel = updateLabels(outcome.outcome);
      dataMap[lowerCaseLabel] = outcome.value;
      noteMap[lowerCaseLabel] = outcome.notes;
    });
    return {
      data : dataMap,
      notes: noteMap
    }
  }

  // check if our set has the value or not
  function updateLabels(potentialLabel){
    var lowerCaseLabel = potentialLabel.toLowerCase();
    if(!labelSet.hasOwnProperty(lowerCaseLabel)){
      labels.push(potentialLabel);
      // now value is in our set
      labelSet[lowerCaseLabel] = true;
    }
    return lowerCaseLabel;
  }

  // Use values map to create the data and notes arrays confroming to 
  // ChartJS requirements. 
  function getExtractedDataAndTooltipNotes(valuesMap){
    // go over currently added labels
    var data = [];
    var notes = [];
    labels.forEach(function(label){
      data.push(getExtractedDataValue(valuesMap.data[label.toLowerCase()]));
      notes.push(getExtractedNoteValue(valuesMap.notes[label.toLowerCase()]))
    });
    return {
      data : data,
      notes: notes
    }
  }

  function getExtractedDataValue(dataValue){
    return dataValue === undefined ? null : dataValue;
  }

  function getExtractedNoteValue(noteValue){
    return noteValue === undefined ? "none" : noteValue; 
  }

  function getLabels(){
    return labels;
  }

  return {
    getChartJSConvertedData: function(sessions){
      init();
      var chartData = {};
      chartData.datasets = getConvertedSessions(sessions);
      chartData.labels = getLabels();
      return chartData;
    }
  };
};

},{"chartjs-color":1,"distinct-colors":1,"moment":1}]},{},[2])(2)
});
