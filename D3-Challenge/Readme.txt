# D3 Homework

#############
#app.js code#
#############
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 40); 


  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var XAxis = "poverty";
var YAxis = "healthcare";

(async function(){

  // Import Data
  var stateData = await d3.csv("assets/data/data.csv");
  console.log(stateData);
  // Parse Data/Cast as numbers
  stateData.forEach(function(data) {
    data.poverty    = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age        = +data.age;
    data.smokes     = +data.smokes;
    data.obesity    = +data.obesity;
    data.income     = +data.income;
  });

  var xlinearScale = xScale(stateData, XAxis);
  var ylinearScale = yScale(stateData, YAxis);

  var bottomAxis = d3.axisBottom(xlinearScale);
  var leftAxis = d3.axisLeft(ylinearScale);

  var xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    var yAxis = chartGroup.append("g")
    .call(leftAxis);

  var circlesGroup = chartGroup.selectAll("g circle")
    .data(stateData)
    .enter()
    .append("g");
  
  var circlesXY = circlesGroup.append("circle")
    .attr("cx", d => xLinearScale(d[XAxis]))
    .attr("cy", d => yLinearScale(d[YAxis]))
    .attr("r", 15)
    .classed("stateCircle", true);
  
  var circlesText = circlesGroup.append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d[XAxis]))
    .attr("dy", d => yLinearScale(d[YAxis]) + 5)
    .classed("stateText", true);

    var xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height})`);

    var povertyLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "poverty") // value to grab for event listener
    .text("In Poverty (%)")
    .classed("active", true);

    var ageLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "age") // value to grab for event listener
    .text("Age (Median)")
    .classed("inactive", true);

    var incomeLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "income") // value to grab for event listener
    .text("Household Income (Median)")
    .classed("inactive", true);

    var ylabelsGroup = chartGroup.append("g");

    var healthcareLabel = ylabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2))
    .attr("y", -40)
    .attr("value", "healthcare") // value to grab for event listener
    .text("Lacks Healthcare (%)")
    .classed("active", true);

    var smokesLabel = ylabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2))
    .attr("y", -60)
    .attr("value", "smokes") // value to grab for event listener
    .text("Smokes (%)")
    .classed("inactive", true);

    var obeseLabel = ylabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2))
    .attr("y", -80)
    .attr("value", "obesity") // value to grab for event listener
    .text("Obese (%)")
    .classed("inactive", true);

  circlesGroup = updateToolTip(circlesGroup, XAxis, YAxis);

  xlabelsGroup.selectAll("text")
    .on("click", function() {
    // get value of selection
    const value = d3.select(this).attr("value");
    if (value !== XAxis) {

        XAxis = value;

      xLinearScale = xScale(stateData, XAxis);

      xAxis = renderXAxes(xLinearScale, xAxis);

      circlesXY = renderXCircles(circlesXY, xLinearScale, XAxis);

      circlesText = renderXText(circlesText, xLinearScale, XAxis);

      circlesGroup = updateToolTip(circlesGroup, XAxis, YAxis);

      if (XAxis === "age") {
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        ageLabel
          .classed("active", true)
          .classed("inactive", false);
        incomeLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (XAxis === "income") {
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        ageLabel
          .classed("active", false)
          .classed("inactive", true);
        incomeLabel
          .classed("active", true)
          .classed("inactive", false);
      }
      else {
        povertyLabel
          .classed("active", true)
          .classed("inactive", false);
        ageLabel
          .classed("active", false)
          .classed("inactive", true);
        incomeLabel
          .classed("active", false)
          .classed("inactive", true);
      }
    }
  });

  ylabelsGroup.selectAll("text")
    .on("click", function() {
    const value = d3.select(this).attr("value");
    if (value !== YAxis) {

        YAxis = value;

      yLinearScale = yScale(stateData, YAxis);

      yAxis = renderYAxes(yLinearScale, yAxis);

      circlesXY = renderYCircles(circlesXY, yLinearScale, YAxis);

      circlesText = renderYText(circlesText, yLinearScale, YAxis);

      circlesGroup = updateToolTip(circlesGroup, XAxis, YAxis);

      if (YAxis === "smokes") {
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
        smokesLabel
          .classed("active", true)
          .classed("inactive", false);
        obeseLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if (YAxis === "obesity"){
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
        smokesLabel
          .classed("active", false)
          .classed("inactive", true);
        obeseLabel
          .classed("active", true)
          .classed("inactive", false);
      }
      else {
        healthcareLabel
          .classed("active", true)
          .classed("inactive", false);
        smokesLabel
          .classed("active", false)
          .classed("inactive", true);
        obeseLabel
          .classed("active", false)
          .classed("inactive", true);
      }
    }
  });

})()// @TODO: YOUR CODE HERE!


###################
#functions.js code#
###################
function xScale(csvData, XAxis) {
  // create scales
  let xLinearScale = d3.scaleLinear()
    .domain([d3.min(csvData, d => d[XAxis]) * 0.9,
      d3.max(csvData, d => d[XAxis]) * 1.1
    ])
    .range([0, width]);

  return xLinearScale;
}

function yScale(csvData, YAxis) {
  // create scales
  let yLinearScale = d3.scaleLinear()
    .domain([d3.min(csvData, d => d[YAxis]) - 1,
      d3.max(csvData, d => d[YAxis]) + 1
    ])
    .range([height, 0]);

  return yLinearScale;
}

function renderXAxes(newXScale, xAxis) {
  let bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

function renderYAxes(newYScale, yAxis) {
  let leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

function renderXCircles(circlesGroup, newXScale, XAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[XAxis]));

  return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, YAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[YAxis]));

  return circlesGroup;
}

function renderXText(circlesGroup, newXScale, XAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("dx", d => newXScale(d[XAxis]));

  return circlesGroup;
}

function renderYText(circlesGroup, newYScale, YAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("dy", d => newYScale(d[YAxis])+5);

  return circlesGroup;
}

let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function updateToolTip(circlesGroup, XAxis, YAxis) {

  let xpercentsign = "";
  let xlabel = "";
  if (XAxis === "poverty") {
    xlabel = "Poverty";
    xpercentsign = "%";
  } else if (XAxis === "age"){
    xlabel = "Age";
  } else {
    xlabel = "Income";
  }

  let ypercentsign = "";
  let ylabel = "";
  if (YAxis === "healthcare") {
    ylabel = "Healthcare";
    ypercentsign = "%";
  } else if (YAxis === "smokes"){
    ylabel = "Smokes";
    ypercentsign = "%";
  } else {
    ylabel = "Obesity";
    ypercentsign = "%";
  }

  const toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([50, -75])
    .html(function(d) {
      if (XAxis === "income"){
        let incomelevel = formatter.format(d[XAxis]);

        return (`${d.state}<br>${xlabel}: ${incomelevel.substring(0, incomelevel.length-3)}${xpercentsign}<br>${ylabel}: ${d[YAxis]}${ypercentsign}`)
      } else {
        return (`${d.state}<br>${xlabel}: ${d[XAxis]}${xpercentsign}<br>${ylabel}: ${d[YAxis]}${ypercentsign}`)
      };
    });

  circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
  
  })
    .on("mouseout", function(data) {
        toolTip.hide(data, this);
    });

return circlesGroup;
}

#################
#index.html code#
#################
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>D3Times</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/d3Style.css">

</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <h1>D3Times</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12  col-md-9">
        <div id="scatter">
          <!-- We append our chart here. -->
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12  col-md-9">
        <div class="article">
          <h2>Correlations Discovered Between Health Risks and Age, Income</h2>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
            quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
            ultricies mi vitae est. Mauris placerat eleifend leo.</p>

          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
            quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
            ultricies mi vitae est. Mauris placerat eleifend leo.</p>

          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
            quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
            ultricies mi vitae est. Mauris placerat eleifend leo.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer-->
  <div id="footer">
    <p>The Coding Boot Camp&copy;2016</p>
  </div>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  <script src="https://d3js.org/d3.v5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-tip/0.9.1/d3-tip.js"></script>
  <script type="text/javascript" src="assets/js/app.js"></script>

</body>

</html>
