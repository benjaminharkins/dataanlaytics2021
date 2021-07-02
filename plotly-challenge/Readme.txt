# Plot.ly Homework


#############
#app.js code#
#############
//global variable
var data;

//init function to fill in the select option

function init() {
  d3.json("JS/data/samples.json").then(d => {
    data = d;
    var selectNames = d.names;

    var selectData = d3.select("#selDataset");

    selectNames.forEach(value => {
        selectData
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
  });
}
//start filling the data inside the select option
init();

//

d3.selectAll("#selDataset").on("change", plotFunctions);

function plotFunctions() {
  var selectValue = d3.select("#selDataset").node().value;
  demographicFunc(selectValue);
  panelPlot(selectValue);
  demographicFunc(selectValue);
  bubbleChart(selectValue);
  gaugeChart(selectValue);
}

function demographicFunc(selectValue) {
  var vfilterB = data.samples.filter(value => value.id == selectValue);
  var ouid = vfilterB.map(v => v.otu_ids);
  ouid = treatOuid(ouid[0].slice(0, 10));
  var valueX = vfilterB.map(v => v.sample_values);
  valueX = valueX[0].slice(0, 10);

  var out_label = vfilterB.map(v => v.otu_labels);
  var names = treatBacName(out_label[0]).slice(0, 10);
  // console.log(ouid);
  // console.log(valueX);
  // console.log(out_label);
  // console.log(names);

  // Create the Trace
  var trace = {
    x: valueX,
    y: ouid,
    text: names,
    type: "bar",
    orientation: "h"
  };

  var layout = {
    yaxis: {
      autorange: "reversed"
    }
  };

  // Create the data array for the plot
  var dataV = [trace];

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", dataV, layout);
}

function panelPlot(selectValue) {
  //   console.log(selectValue);
  var vfilter = data.metadata.filter(value => value.id == selectValue);

  var divValue = d3.select(".panel-body");
  divValue.html("");
  divValue.append("p").text(`id: ${vfilter[0].id}`);
  divValue.append("p").text(`ethnicity: ${vfilter[0].ethnicity}`);
  divValue.append("p").text(`gender: ${vfilter[0].gender}`);
  divValue.append("p").text(`age: ${vfilter[0].age}`);
  divValue.append("p").text(`location: ${vfilter[0].location}`);
  divValue.append("p").text(`bbtype: ${vfilter[0].bbtype}`);
  divValue.append("p").text(`wfreq: ${vfilter[0].wfreq}`);
}

function bubbleChart(selectValue) {
  var vfilterC = data.samples.filter(value => value.id == selectValue);
  var ouid = vfilterC.map(v => v.otu_ids);
  ouid = ouid[0];
  var valueY = vfilterC.map(v => v.sample_values);
  valueY = valueY[0];

  var out_label = vfilterC.map(v => v.otu_labels);
  out_label = treatBacName(out_label[0]);

  var trace1 = {
    x: ouid,
    y: valueY,
    mode: "markers",
    marker: {
      color: ouid,
      size: valueY
    },
    text: out_label
  };

  var data2 = [trace1];

  var layout = {
    showlegend: false,
    xaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bubble", data2, layout);
}

//function to create gauge chart and set the value based on the value selected
function gaugeChart(selectValue) {
  var vfilter = data.metadata.filter(value => value.id == selectValue);
  var weeklyFreq = vfilter[0].wfreq;

  var data2 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      title: {
        text: "Belly Button Washing Frequency <br>Scrubs per Week"
      },
      type: "indicator",

      mode: "gauge",
      gauge: {
        axis: {
          range: [0, 9],
          tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          ticks: "outside"
        },

        steps: [
          { range: [0, 1], color: "EEDFE7" },
          { range: [1, 2], color: "#E2CBD2" },
          { range: [2, 3], color: "#D5B6BA" },
          { range: [3, 4], color: "#C9A4A2" },
          { range: [4, 5], color: "#BC998E" },
          { range: [5, 6], color: "#AF917A" },
          { range: [6, 7], color: "#A28B67" },
          { range: [7, 8], color: "#797B4C" },
          { range: [8, 9], color: "#5D673E" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 1,
          value: weeklyFreq
        }
      }
    }
  ];

  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", data2, layout);
}

//function to return the name of the bacteria.
// if a array value has more than one name, it will consider the last name of the value
// return just the 10 first values of the result
function treatBacName(name) {
  var bacteriaList = [];

  for (var i = 0; i < name.length; i++) {
    var stringName = name[i].toString();
    var splitValue = stringName.split(";");
    if (splitValue.length > 1) {
        bacteriaList.push(splitValue[splitValue.length - 1]);
    } else {
        bacteriaList.push(splitValue[0]);
    }
  }
  return bacteriaList;
}

function treatOuid(name) {
  var ouidList = [];
  for (var i = 0; i < name.length; i++) {
    ouidList.push(`OTU ${name[i]}`);
  }
  return ouidList;
}


#################
#index.html code#
#################

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Bellybutton Biodiversity</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>

<body>

  <div class="container">
    <div class="row">
      <div class="col-md-12 jumbotron text-center">
        <h1>Belly Button Biodiversity Dashboard</h1>
        <p>Use the interactive charts below to explore the dataset</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <div class="well">
          <h5>Test Subject ID No.:</h5>
          <select id="selDataset" onchange="optionChanged(this.value)"></select>
        </div>
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Demographic Info</h3>
          </div>
          <div id="sample-metadata" class="panel-body"></div>
        </div>
      </div>
      <div class="col-md-5">
        <div id="bar"></div>
      </div>
      <div class="col-md-5">
        <div id="gauge"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div id="bubble"></div>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.5.0/d3.js"></script>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script src="./static/js/app.js"></script>
  <script src="./static/js/bonus.js"></script>
  <script src="samples.json"></script>
  
</body>

</html>
