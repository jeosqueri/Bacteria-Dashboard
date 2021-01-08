//  Use the D3 library to read in `samples.json`.
dataset = "samples.json";

d3.json(dataset).then(function(data) {
    console.log(data);    //work with data inside this
  });

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
    var subjectIDNum = samples.map(row => row.id);
    console.log(subjectIDNum);
    
    //Horizontal bar chart
    //Sample values
    var sampleValues = samples.map(row => row.sample_values);
    var sampleVals = sampleValues[subjectID].slice(0,10).reverse();
    //OTU IDS
    var otuIds = data.samples.map(row => row.otu_ids);
    var otuIdsSub = otuIds[subjectID].slice(0,10);
    var otuIdsText = otuIdsSub.map(id => `OTU `+id);
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
        y: otuIdsText,
        orientation: 'h',
        text: otuLabelsSub,
        marker: {
          color: 'rgb(82,188,163)'}
    };

    var data1 = [trace1];

    var layout = {
        title: `${subID}: Top 10 OTUs`,
        xaxis: {
          title: 'Sample Values',
          automargin: true
        },
        yaxis: {
          automargin: true,
          type: 'category'
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
        color: otuIdsSub,
        sizeref: 0.2,
        sizemode: 'area'
      }
    };

    var data2 = [trace2];

    var layout2 = {
      title: `Subject ${subID}: Sample Values`,
      xaxis: {
        title: `OTU IDs`
      },
      yaxis: {
        title: `Sample Values`
      }
    };

    Plotly.newPlot('bubble', data2, layout2);
    // Pie chart

    // var trace3 = [{
    //   values: sampleVals,
    //   labels: sampleVals,
    //   type: 'pie'
    // }];

    // var data3 = [trace3];

    // Plotly.newPlot('pie', data3);

    // Metadata
    var metaData = data.metadata;
    console.log(metaData);

    // Demographic Info
    var demData = d3.select('#sample-metadata');
    demData.html('');
    
    Object.entries(metaData[subjectID]).forEach(([key, value]) => {
      demData.append('p').text(`${key.toUpperCase()}:\n${value}`);
    });

    // Gauge chart
    var washFreq = metaData.map(row => row.wfreq);
    console.log(washFreq);
    var washFreqSub = washFreq[subjectID];
    console.log(washFreqSub);

    var traceGauge = [{
      domain: {x: [0,9], y: [0,9]},
      value: washFreqSub,
      title: { text: "Belly Button Washing Frequency"},
      values: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      textposition: 'inside',
      type: 'indicator',
      mode: "gauge+number",
      marker: {
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9']
      },
      gauge: {
        axis: {range: [0,10]},
        bar: {thickness: 0},
        steps: [
          {name: '0-1', range: [0,1], color: 'rgb(253, 242, 233)'},
          {name: '1-2', range: [1,2], color: 'rgb(250, 229, 211)'},
          {name: '2-3', range: [2,3], color: 'rgb(245, 203, 167)'}, 
          {name: '3-4', range: [3,4], color: 'rgb(233, 247, 239 )'}, 
          {name:'4-5', range: [4,5], color: 'rgb(212, 239, 223)'}, 
          {name: '5-6', range: [5,6], color:'rgb(169, 223, 191)'}, 
          {name:'6-7', range: [6,7], color:'rgb(125, 206, 160)'}, 
          {name:'7-8', range: [7,8], color:'rgb(130, 224, 170)'}, 
          {name:'8-9', range: [8,9], color:'rgb(88, 214, 141)'}
        ]
      }
    }];

    Plotly.newPlot('gauge', traceGauge);

    });
}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);