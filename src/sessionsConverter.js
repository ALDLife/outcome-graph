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
