function xScale(csvData, cXAxis) {
  // create scales
  let xLinearScale = d3.scaleLinear()
    .domain([d3.min(csvData, d => d[cXAxis]) * 0.9,
      d3.max(csvData, d => d[cXAxis]) * 1.1
    ])
    .range([0, width]);

  return xLinearScale;
}

function yScale(csvData, cYAxis) {
  // create scales
  let yLinearScale = d3.scaleLinear()
    .domain([d3.min(csvData, d => d[cYAxis]) - 1,
      d3.max(csvData, d => d[cYAxis]) + 1
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

function renderXCircles(circlesGroup, newXScale, cXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[cXAxis]));

  return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, cYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[cYAxis]));

  return circlesGroup;
}

function renderXText(circlesGroup, newXScale, cXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("dx", d => newXScale(d[cXAxis]));

  return circlesGroup;
}

function renderYText(circlesGroup, newYScale, cYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("dy", d => newYScale(d[cYAxis])+5);

  return circlesGroup;
}

let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function updateToolTip(circlesGroup, cXAxis, cYAxis) {

  let xpercentsign = "";
  let xlabel = "";
  if (cXAxis === "poverty") {
    xlabel = "Poverty";
    xpercentsign = "%";
  } else if (cXAxis === "age"){
    xlabel = "Age";
  } else {
    xlabel = "Income";
  }

  let ypercentsign = "";
  let ylabel = "";
  if (cYAxis === "healthcare") {
    ylabel = "Healthcare";
    ypercentsign = "%";
  } else if (cYAxis === "smokes"){
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
      if (cXAxis === "income"){
        let incomelevel = formatter.format(d[cXAxis]);

        return (`${d.state}<br>${xlabel}: ${incomelevel.substring(0, incomelevel.length-3)}${xpercentsign}<br>${ylabel}: ${d[cYAxis]}${ypercentsign}`)
      } else {
        return (`${d.state}<br>${xlabel}: ${d[cXAxis]}${xpercentsign}<br>${ylabel}: ${d[cYAxis]}${ypercentsign}`)
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