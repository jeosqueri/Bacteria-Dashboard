//  Use the D3 library to read in `samples.json`.
dataset = "samples.json";

d3.json(dataset).then(function(data) {
    console.log(data);    //work with data inside this
  });

function unpack(rows, index) {
    return rows.map(function(row) {
    return row[index];
    });
    }
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

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function buildPlot(dropdownMenu) {
    var dataset = "samples.json";

    d3.json(dataset).then(function(data) {
    console.log(data);    //work with data inside this
    var samples = data.samples;
    console.log(samples);
    
    var sampleValues = data.samples.map(row => row[2]);
    var otuIds = data.samples.map(row => row[1]);
    var otuLabels = data.samples.map(row => row[3]);
    console.log(sampleValues);

    var trace1 = {
        type: 'bar',
        x: sampleValues,
        y: otuIds,
        orientation: 'h',
        text: otuLabels
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

    Plotly.newPlot("plot", data, layout);
    });
}

buildPlot();