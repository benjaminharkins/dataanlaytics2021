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