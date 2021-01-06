//  Use the D3 library to read in `samples.json`.
dataset = "samples.json";

d3.json(dataset).then(function(data) {
    console.log(data);    //work with data inside this
  });

// function unpack(rows, index) {
//     return rows.map(function(row) {
//     return row[index];
//     });
//     }
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);

// Dropdown
function updatePlot() {
    // Prevent the page from refreshing
    //d3.event.preventDefault();
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node().value;
    // Assign the value of the dropdown menu option to a variable
    //var dropdownValue = dropdownMenu.property("value");
   
    // Build the plot with the new stock
    buildPlot(dropdownMenu);
  }

var dropdownValues = d3.json(dataset).then((data) => {
  var id = data.names;
  console.log(id);
  var dropdownSelect = d3.select('#selDataset');
  Object.entries(id).forEach(([key, value]) => {
    dropdownSelect.append('option').text(value);
  });
})

console.log(dropdownValues);

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function buildPlot(subID) {
    var dataset = "samples.json";

    d3.json(dataset).then(function(data) {
    console.log(data);    //work with data inside this
    var samples = data.samples;
    console.log(samples);
    var subjectID = samples.map(row => row.id).indexOf(subID);
    console.log(subjectID);
    
    var sampleValues = samples.map(row => row.sample_values);
    var sampleVals = sampleValues[subjectID].slice(0,10).reverse();
    var otuIds = data.samples.map(row => row.otu_ids);
    var otuIdsSub = otuIds[subjectID].slice(0,10);
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
        text: otuLabelsSub
    }

    var data = [trace1];

    var layout = {
        title: `Belly`,
        xaxis: {
          range: [0,11],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };

    Plotly.newPlot('#selDataset', data, layout);
    });
}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);

//updatePlot();