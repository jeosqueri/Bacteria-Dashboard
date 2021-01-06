//  Use the D3 library to read in `samples.json`.
dataset = "samples.json";

d3.json(dataset).then(function(data) {
    console.log(data);    //work with data inside this
  });

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);

// Dropdown
function updatePlot() {
    // Prevent the page from refreshing
    //d3.event.preventDefault();
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node().value;
  
    // Build the plot with the new stock
    buildPlot(dropdownMenu);
  }

//Append IDs to dropdown menu
var dropdownValues = d3.json(dataset).then((data) => {
  var id = data.names;
  console.log(id);
  var dropdownSelect = d3.select('#selDataset');
  Object.entries(id).forEach(([key, value]) => {
    dropdownSelect.append('option').text(value);
  });
})

console.log(dropdownValues);

// Build plots
function buildPlot(subID) {
    var dataset = "samples.json";

    d3.json(dataset).then(function(data) {
    console.log(data);    //work with data inside this
    var samples = data.samples;
    console.log(samples);
    var subjectID = samples.map(row => row.id).indexOf(subID);
    console.log(subjectID);
    
    //Horizontal bar chart
    //Sample values
    var sampleValues = samples.map(row => row.sample_values);
    var sampleVals = sampleValues[subjectID].slice(0,10).reverse();
    //OTU IDS
    var otuIds = data.samples.map(row => row.otu_ids);
    var otuIdsSub = otuIds[subjectID].slice(0,10);
    //OTU Labels
    var otuLabels = data.samples.map(row => row.otu_labels);
    var otuLabelsSub = otuLabels[subjectID].slice(0,10);
    console.log(sampleValues);
    console.log(sampleVals);
    console.log(otuIds);
    console.log(otuIdsSub);
    console.log(otuLabels);
    console.log(otuLabelsSub);

    var trace1 = {
        type: 'bar',
        x: sampleVals,
        y: otuIdsSub,
        orientation: 'h',
        text: otuLabelsSub,
        marker: {
          color: 'rgb(82,188,163)'}
    };

    var data1 = [trace1];

    var layout = {
        title: `Belly`,
        xaxis: {
          title: 'Sample Values'
        },
        yaxis: {
          title: 'Sub IDS'
        }
      };

    Plotly.newPlot('bar', data1, layout);

    // Bubble chart
    var trace2 = {
      x: otuIdsSub,
      y: sampleVals,
      mode: 'markers',
      text: otuLabelsSub,
      marker: {
        size: sampleVals,
        color: otuIdsSub
      }
    };

    var data2 = [trace2];

    Plotly.newPlot('bubble', data2);
    
    // Metadata
    var metaData = data.metadata;
    console.log(metaData);

    // Demographic Info
    var demData = d3.select('#sample-metadata');
    demData.html('');
    
    Object.entries(metaData[subjectID]).forEach(([key, value]) => {
      demData.append('p').text(`${key.toUpperCase()}:\n${value}`);
    });

    });
}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);

//updatePlot();