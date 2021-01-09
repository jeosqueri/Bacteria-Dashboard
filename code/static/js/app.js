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
    var sampleValsSubject = sampleValues[subjectID].slice(0,10);
    //OTU IDS
    var otuIds = data.samples.map(row => row.otu_ids);
    var otuIdsSubject = otuIds[subjectID].slice(0,10);
    var otuIdsText = otuIdsSubject.map(id => `OTU `+id);
    //OTU Labels
    var otuLabels = data.samples.map(row => row.otu_labels);
    var otuLabelsSubject = otuLabels[subjectID].slice(0,10);
    console.log(sampleValues);
    console.log(sampleValsSubject);
    console.log(otuIds);
    console.log(otuIdsSubject);
    console.log(otuLabels);
    console.log(otuLabelsSubject);

    var trace1 = {
        type: 'bar',
        x: sampleValsSubject,
        y: otuIdsText,
        orientation: 'h',
        text: otuLabelsSubject,
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
    var allOTUs = otuIds[subjectID];
    console.log(allOTUs);
    var allSampleVals = sampleValues[subjectID];
    var allLabels = otuLabels[subjectID];


    var trace2 = {
      x: allOTUs,
      y: allSampleVals,
      mode: 'markers',
      text: allLabels,
      marker: {
        size: allSampleVals,
        color: allOTUs,
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
    //fix this
    var pieColors = ['#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#DC143C', '#FF0000','#B22222','#8B0000', '#FF6347']

    var trace3 = {
      values: otuIdsSubject,
      labels: otuIdsSubject,
      type: 'pie',
      marker: {
        colors: pieColors
      }
    };

    var data3 = [trace3];

    var layout3 = {
      title: `<b>Top 10 OTU % </b>`,
      plot_bgcolor: 'rbg(253, 242, 233)'
    }

    Plotly.newPlot('pie', data3, layout3);

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
    var washFreqSubject = washFreq[subjectID];
    console.log(washFreqSubject);

    var traceGauge = [{
      domain: {x: [0,9], y: [0,9]},
      value: washFreqSubject,
      title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
      values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      textposition: 'inside',
      textinfo: 'text',
      type: 'indicator',
      mode: "gauge+number",
      marker: {
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        hoverinfo: 'label'
      },
      gauge: {
        axis: {range: [0,9], ticks: 'inside'},
        bar: {thickness: 0},
        threshold: {
          line: { color: "black", width: 4 },
          thickness: 0.75,
          value: washFreqSubject},
        steps: [
          {name: '0-1', range: [0,1], color: 'rgb(253, 242, 233)'},
          {name: '1-2', range: [1,2], color: 'rgb(250, 229, 211)'},
          {name: '2-3', range: [2,3], color: 'rgb(246, 221, 204)'}, 
          {name: '3-4', range: [3,4], color: 'rgb(233, 247, 239 )'}, 
          {name:'4-5', range: [4,5], color: 'rgb(212, 239, 223)'}, 
          {name: '5-6', range: [5,6], color:'rgb(171, 235, 198)'}, 
          {name:'6-7', range: [6,7], color:'rgb(130, 224, 170)'}, 
          {name:'7-8', range: [7,8], color:'rgb(88, 214, 141)'}, 
          {name:'8-9', range: [8,9], color:'rgb(46, 204, 113)'}
        ]
      }
    }];

    // var degrees = 50, radius = .9
    // var radians = degrees * Math.PI / 180
    // var x = -1 * radius * Math.cos(radians) * wfreqNum
    // var y = radius * Math.sin(radians)

    // var gaugeLayout = {
    //   shapes: [{
    //     type: 'line',
    //     x0: 0.5,
    //     y0: 0.5,
    //     x1: 0.6,
    //     y1: 0.6,
    //     line: {
    //       color: 'black',
    //       width: 3
    //     }
    //   }],
    //   title: 'Chart',
    //   xaxis: {visible: false, range: [-1, 1]},
    //   yaxis: {visible: false, range: [-1, 1]}
    // };

    Plotly.newPlot('gauge', traceGauge);

    });
}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);