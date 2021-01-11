//  Use the D3 library to read in `samples.json` and initialize page
dataset = "samples.json";

d3.json(dataset).then(function(data) {
    console.log(data);   
  });

// Create dropdown menu
function updatePlot() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node().value;
    // Call build plot function on dropdown menu
    buildPlot(dropdownMenu);
  }

//Append subject IDs to dropdown menu
var dropdownValues = d3.json(dataset).then((data) => {
  var id = data.names;
  console.log(id);
  var dropdownSelect = d3.select('#selDataset');
  Object.entries(id).forEach(([key, value]) => {
    dropdownSelect.append('option').text(value);
  });
})

console.log(dropdownValues);

// Create function to build plots
function buildPlot(subID) {
    var dataset = "samples.json";

    d3.json(dataset).then(function(data) {
    console.log(data);
    var samples = data.samples;
    console.log(samples);
    var subjectID = samples.map(row => row.id).indexOf(subID);
    console.log(subjectID);
    var subjectIDNum = samples.map(row => row.id);
    console.log(subjectIDNum);
    
    //Create horizontal bar chart for displaying top 10 OTUs for each subject
    //Define sample values & slice them for top 10 values
    var sampleValues = samples.map(row => row.sample_values);
    var sampleValsSubject = sampleValues[subjectID].slice(0,10);
    //Define OTU IDS & slice
    var otuIds = data.samples.map(row => row.otu_ids);
    var otuIdsSubject = otuIds[subjectID].slice(0,10);
    var otuIdsText = otuIdsSubject.map(id => `OTU `+id);
    //Define OTU Labels & slice
    var otuLabels = data.samples.map(row => row.otu_labels);
    var otuLabelsSubject = otuLabels[subjectID].slice(0,10);
    //Display values in console
    console.log(sampleValues);
    console.log(sampleValsSubject);
    console.log(otuIds);
    console.log(otuIdsSubject);
    console.log(otuIdsText);
    console.log(otuLabels);
    console.log(otuLabelsSubject);

    //Create trace for horizontal bar chart
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
          type: 'category',
          categoryorder: 'total ascending'
        }
      };

    Plotly.newPlot('bar', data1, layout);

    // Create bubble chart that displays each sample for each subject
    var allOTUs = otuIds[subjectID];
    console.log(allOTUs);
    var allSampleVals = sampleValues[subjectID];
    console.log(allSampleVals);
    var allLabels = otuLabels[subjectID];
    console.log(allLabels);

    //Create trace for bubble chart
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

    //Extra visualization: Create pie chart to display top 10 OTUs as a %
    //Define array of colors to use in pie chart
    var pieColors = ['#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#DC143C', '#FF0000','#B22222','#8B0000', '#FF6347']

    //Create trace for pie chart
    var trace3 = {
      values: sampleValsSubject,
      labels: otuIdsText,
      type: 'pie',
      marker: {
        colors: pieColors
      }
    };

    var data3 = [trace3];

    var layout3 = {
      title: `Top 10 OTUs: Sample Values as %`
    };

    Plotly.newPlot('pie', data3, layout3);

    //Create variable to hold metadata & display in console
    var metaData = data.metadata;
    console.log(metaData);

    //Display each key-value pair (including demographic info) from subjects metadata in Demographic Info panel
    var demData = d3.select('#sample-metadata');
    demData.html('');
    
    Object.entries(metaData[subjectID]).forEach(([key, value]) => {
      demData.append('p').text(`${key.toUpperCase()}:\n${value}`);
    });

    //BONUS: Create gauge chart to display belly button wash frequency
    var washFreq = metaData.map(row => row.wfreq);
    console.log(washFreq);
    var washFreqSubject = washFreq[subjectID];
    console.log(washFreqSubject);

    var traceGauge = [{
      domain: {x: [0,9], y: [0,9]},
      value: washFreqSubject,
      title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
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

    Plotly.newPlot('gauge', traceGauge);

    });
}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);