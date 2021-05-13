// from data.js
var tableData = data;

// YOUR CODE HERE!
//setting variables
var tableBody = d3.select("tbody");
var filterbtn = d3.select("#filter-btn");
var inputDates = d3.select("#date");
var inputCities = d3.select("#city");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]


//looping through the data for all ufo sightings
var populate = (dataInput) => {

	dataInput.forEach(ufo_sightings => {
		var row = tableBody.append("tr");
		columns.forEach(column => row.append("td").text(ufo_sightings[column])
		)
	});
}

//Populating table
populate(data);

// Filter by attribute
filterbtn.on("click", () => {
    console.log(filterbtn);
	d3.event.preventDefault();
	var inputDate = inputDates.property("value").trim();
	var inputCity = inputCities.property("value").toLowerCase().trim();//trimming to lower case to match source data
	
    // Filter by field matching input value
	var filterDate = data.filter(data => data.datetime === inputDate);
	console.log(filterDate)
	var filterCity = data.filter(data => data.city === inputCity);
	console.log(filterCity)
	var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
	console.log(filterData)

	// Add filtered sighting to table
	tableBody.html("");

	var response = {
		filterData, filterCity, filterDate
	}

	if (response.filterData.length !== 0) {
		populate(filterData);
	}
		else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
			populate(filterCity) || populate(filterDate);
	
		}
		else {
			tbody.append("tr").append("td").text("No results found!"); 
		}
})

resetbtn.on("click", () => {
	tbody.html("");
	populate(data)
	console.log("Table reset")
})