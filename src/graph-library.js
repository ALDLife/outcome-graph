function convertToChart(sessions){
  //need to know labels
  var labels = [];
  var labelSet = {};
  var convertedData = [];
  var now = moment();
  var color = Chart.helpers.color;
    // go over each session
  sessions.forEach(function(session){
    var outcomes = session.outcomes;
    // data set item for session
    var convertedSession = {};

    var momentTimestamp = moment(session.timestamp);
    var humanisedTimestamp = moment.duration(momentTimestamp.diff(now)).humanize(true);

    convertedSession.label = humanisedTimestamp;
    convertedSession.dataMap = {};
    convertedSession.noteMap = {};
    // add each outcome to a set
    outcomes.forEach(function(outcome){
      // check if our set has the value or not
      var lowerCaseLabel = outcome.outcome.toLowerCase();
      if(!labelSet.hasOwnProperty(lowerCaseLabel)){
        labels.push(outcome.outcome);
        // now value is in our set
        labelSet[lowerCaseLabel] = true;
      }
      convertedSession.dataMap[lowerCaseLabel] = outcome.value;
      convertedSession.noteMap[lowerCaseLabel] = outcome.notes;
    });
    convertedSession.data = [];
    convertedSession.notes = [];
    // loop over our labels to get the data for each and create the data array
    labels.forEach(function(label){
      var dataMapValue = convertedSession.dataMap[label.toLowerCase()];
      var noteMapValue = convertedSession.noteMap[label.toLowerCase()];
      if(dataMapValue !== undefined){
        convertedSession.data.push(dataMapValue);
      }else{
        convertedSession.data.push(null);
      }

      if(noteMapValue !== undefined){
        convertedSession.notes.push(noteMapValue);
      }else{
        convertedSession.notes.push("none");
      }
      //assign random colour to chart
      var colour = randomColor({
        format: 'rgba'
      });
      convertedSession.backgroundColor = color(colour).alpha(0.2).rgbString();
      convertedSession.borderColor = colour;
      convertedSession.pointBackgroundColor = colour;
    });
    convertedData.push(convertedSession);
  });
  var chartData = {};
  chartData.labels = labels;
  chartData.datasets = convertedData;
  return chartData;
}

