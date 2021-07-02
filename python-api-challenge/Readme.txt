# Python API Homework

#################
#VacationPy Code#
#################
# Dependencies and Setup
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import requests
import gmaps
import os

# Import API key
from api_keys import g_key

# Load CSV file generated from WeatherPy Folder
weatherData_csv = "../output_data/cities.csv"
weatherData = pd.read_csv(weatherData_csv)
weatherData.head(20)

from IPython.display import display
import ipywidgets as widgets
import gmaps
# Import API key
from api_keys import g_key
# Configure gmaps
gmaps.configure(api_key=g_key)

#Check whether needed
# Set the locations
data_locations = weatherData[["Lat", "Lng"]].astype(float)

# Set the humidity
humidity_data = weatherData["Humidity"].astype(float)


fig = gmaps.figure()

heatmap_layer = gmaps.heatmap_layer(data_locations, weights=humidity_data,
                                   dissipating=False, max_intensity=10,
                                   point_radius=1)


fig.add_layer(heatmap_layer)

fig

# Create criteria for the perfect vacation climate
# A max temperature lower than 80 degrees but higher than 65.
# Wind speed less than 10 and no clouds
criteria_temp = weather_data['Max Temp'] < 85
criteria_temp = weather_data['Max Temp'] > 60
criteria_windSpeed = weather_data['Wind Speed'] < 10
criteria_cloudiness = weather_data['Cloudiness'] == 0
criteria_all = criteria_temp & criteria_windSpeed & criteria_cloudiness 

# Use boolean indexing to filter the weather_df dataframe
idealWeather_df = weatherData[criteria_all]
idealWeather_df = ideal_weather_df.dropna()
idealWeather_df = idealWeather_df.reset_index()
idealWeather_df.head(10)

# create hotel_df with hotel name column
hotel_df = pd.DataFrame(idealWeather_df, columns=['City', 'Country', 'Lat', 'Lng', 'Max Temp', 'Hotel Name'])
hotel_df

# parameters dictionary to update each iteration
parameters = {
    "radius": 5000,
    "types": "lodging",
    "keyword": "Hotel",
    "key": g_key
}

# Use the lat/lng to identify airports
for index, row in hotel_df.iterrows():
    # get lat, lng from hotel_df
    lattitude = row["Lat"]
    longitude = row["Lng"]

    # change location each iteration while leaving original params in place
    parameters["location"] = f"{lattitude},{longitude}"

    # Use the search term: "Hotel" with lat/lng
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    # make request and print url
    url_address = requests.get(base_url, parameters=parameters)
    
#print the name_address url, avoid doing for public github repos in order to avoid exposing key
    print(url_address.url)

    # convert to json
    url_address = url_address.json()
    print(json.dumps(url_address, indent=4, sort_keys=True))

    # Since some data may be missing we incorporate a try-except to skip any that are missing a data point.
    try:
        hotel_df.loc[index, "Hotel Name"] = url_address["results"][0]["name"]
        hotel_df.loc[index, "Airport Address"] = url_address["results"][0]["vicinity"]
        hotel_df.loc[index, "Airport Rating"] = url_address["results"][0]["rating"]
    except (KeyError, IndexError):
        print("Missing field/result... skipping.")
hotel_df.info()

# NOTE: Do not change any of the code in this cell

# Using the template add the hotel marks to the heatmap
info_box_template = """
<dl>
<dt>Name</dt><dd>{Hotel Name}</dd>
<dt>City</dt><dd>{City}</dd>
<dt>Country</dt><dd>{Country}</dd>
</dl>
"""
# Store the DataFrame Row
# NOTE: be sure to update with your DataFrame name
hotel_info = [info_box_template.format(**row) for index, row in hotel_df.iterrows()]
locations = hotel_df[["Lat", "Lng"]]

# Add marker layer ontop of heat map

fig = gmaps.figure()

# Create hotel symbol layer
hotel_Layer = gmaps.marker_layer(
    locations,info_box_content=[info_box_template.format(**row) for index, row in hotel_df.iterrows()]
)


# Add layer
fig.add_layer(heatmap_layer)
fig.add_layer(hotel_Layer)
# Display figure
fig


################
#WeatherPy Code#
################
# Dependencies and Setup
import matplotlib.pyplot as plt
import ipywidgets as widgets
import pandas as pd
import numpy as np
import requests
from pprint import pprint
import matplotlib.patches as mpatches 
import time
import json
import random
from scipy.stats import linregress
import os
from api_keys import weather_api_key


# Import API key
temp_units = "imperial"

# Incorporated citipy to determine city based on latitude and longitude
from citipy import citipy

# Range of latitudes and longitudes
lat_range = (-90, 90)
lng_range = (-180, 180)

# define url
query_url = f"http://api.openweathermap.org/data/2.5/weather?appid={weather_api_key}&units={temp_units}&q="

# define count of pass throughs
count_one = 0
set_one = 1

#url = "http://api.openweathermap.org/data/2.5/weather?"
#city = "London"

# Build query URL
#query_url = url + "appid=" + weather_api_key + "&q=" + city

#weather_response = requests.get(query_url)
#weather_json = weather_response.json()

# Get the temperature from the response
#print(weather_json)

# List for holding lat_lngs and cities
lat_lngs = []
cities = []

# Create a set of random lat and lng combinations
lats = np.random.uniform(lat_range[0], lat_range[1], size=1500)
lngs = np.random.uniform(lng_range[0], lng_range[1], size=1500)
lat_lngs = zip(lats, lngs)

# Identify nearest city for each lat, lng combination
for lat_lng in lat_lngs:
    city = citipy.nearest_city(lat_lng[0], lat_lng[1]).city_name
    
    # If the city is unique, then add it to a our cities list
    if city not in cities:
        cities.append(city)

# Print the city count to confirm sufficient count
len(cities)

# set lists for the dataframe

#city_two = []
#cloudiness = []
#dates = []
#humidities = []
#lats = []
#lngs = []
#max_temps = []
#feels_like = []
#wind_speeds = []
#countries = []
#name = []
#i_d = []
# set initial count quantities for organization
#count_one = 0
#set_one = 1

# loops for creating dataframe columns
#for city in cities:
#    try:
#        #response = requests.get(query_url + city.replace(" ","&")).json()
#        response = requests.get(query_url + city).json()
#        cloudiness.append(response['clouds']['all'])
#        countries.append(response['sys']['country'])
#        dates.append(response['dt'])
#        humidities.append(response['main']['humidity'])
#        lats.append(response['coord']['lat'])
#        lngs.append(response['coord']['lon'])
#        max_temps.append(response['main']['temp_max'])
#        feels_like.append(response['main']['feels_like'])
#        wind_speeds.append(response['wind']['speed'])
#        name.append(response['name'])
#        i_d.append(response['City ID'])
#        if count_one > 48:
#            count_one = 1
#            set_one += 1
#            city_two.append(city)
#        else:
#            count_one += 1
#            city_two.append(city)
#        print(f"Processing Record {count_one} of Set {set_one} | {city}")
#    except Exception:
#        print("City not found. Skipping...")
#print("------------------------------\nData Retrieval Complete\n------------------------------")

# create dictionary for establishing dataframe
#weather_dict = {
#    "City":city_two,
#    "Cloudiness":cloudiness,
#    "Country":countries,
#    "Date":dates,
#    "Humidity":humidities,
#    "Lat":lats,
#    "Lng":lngs,
#    "Max Temp":max_temps,
#    "Wind Speed":wind_speeds,
#    "Feels like":feels_like,
#    "Name":name}

# create dataframe
#weather_dataframe = pd.DataFrame(weather_dict)
#weather_dataframe.head()

# output data to csv
#weather_dataframe.to_csv('output_data/cities_1.csv')

# This code is here so that I can continue to tweak my graphs and the rest of my code without doing a new api call every time
weather_df = pd.read_csv('../output_data/cities.csv')

# Get a lay of the land
weather_df.count()

# Show the dataframe
weather_df.head()

# create graph
plt.figure(figsize = (12, 8))                                                
plt.scatter(weather_df['Lat'], weather_df['Max Temp'], marker="o", facecolors='blue', edgecolors='black')
plt.xlim(-90, 90)
plt.ylim(-60, 120)
plt.xlabel('Latitude')
plt.ylabel('Max Temperature (F)')
plt.axvline(0, c='k', alpha=.4)
plt.axvline(23.5, c='k', alpha=.2)
plt.axvline(-23.5, c='k', alpha=.2)
plt.axhline(32, c='k', alpha=.4)
plt.title('City Latitude vs. Max Temperature')
plt.gcf().text(.50, .205, 'Equator', fontsize=8, rotation='vertical')
plt.gcf().text(.40, .265, 'Tropic of Capricorn', fontsize=8, rotation='vertical')
plt.gcf().text(.60, .255, 'Tropic of Cancer', fontsize=8, rotation='vertical')
plt.gcf().text(.14, .49, 'Freezing Point (F)', fontsize=8, rotation='horizontal')
plt.savefig("fig1.png")
plt.show()

# create graph
plt.figure(figsize = (12, 8))                                                
plt.scatter(weather_df['Lat'], weather_df['Humidity'], marker="o", facecolors='blue', edgecolors='black')
plt.xlim(-90, 90)
plt.ylim(-20, 120)
plt.xlabel('Latitude')
plt.ylabel('Humidity (%)')
plt.axvline(0, c='k', alpha=.4)
plt.axvline(23.5, c='k', alpha=.2)
plt.axvline(-23.5, c='k', alpha=.2)
plt.title('City Latitude vs. Humidity')
plt.gcf().text(.50, .205, 'Equator', fontsize=8, rotation='vertical')
plt.gcf().text(.40, .265, 'Tropic of Capricorn', fontsize=8, rotation='vertical')
plt.gcf().text(.60, .255, 'Tropic of Cancer', fontsize=8, rotation='vertical')
plt.savefig("fig2.png")
plt.show()

# create graph
plt.figure(figsize = (12, 8))                                               
plt.scatter(weather_df['Lat'], weather_df['Cloudiness'], marker="o", facecolors='blue', edgecolors='black')
plt.xlim(-90, 90)
plt.ylim(-20, 120)
plt.xlabel('Latitude')
plt.ylabel('Cloudiness (%)')
plt.axvline(0, c='k', alpha=.4)
plt.axvline(23.5, c='k', alpha=.2)
plt.axvline(-23.5, c='k', alpha=.2)
plt.title('City Latitude vs. Cloudiness')
plt.gcf().text(.50, .205, 'Equator', fontsize=8, rotation='vertical')
plt.gcf().text(.40, .265, 'Tropic of Capricorn', fontsize=8, rotation='vertical')
plt.gcf().text(.60, .255, 'Tropic of Cancer', fontsize=8, rotation='vertical')
plt.savefig("fig3.png")
plt.show()

# create graph
plt.figure(figsize = (12, 8))                                                
plt.scatter(weather_df['Lat'], weather_df['Wind Speed'], marker="o", facecolors='blue', edgecolors='black')
plt.xlim(-90, 90)
plt.ylim(-5, 50)
plt.xlabel('Latitude')
plt.ylabel('Wind Speed (mph)')
plt.axvline(0, c='k', alpha=.4)
plt.axvline(23.5, c='k', alpha=.2)
plt.axvline(-23.5, c='k', alpha=.2)
plt.title('City Latitude vs. Wind Speed')
plt.gcf().text(.50, .205, 'Equator', fontsize=8, rotation='vertical')
plt.gcf().text(.40, .265, 'Tropic of Capricorn', fontsize=8, rotation='vertical')
plt.gcf().text(.60, .255, 'Tropic of Cancer', fontsize=8, rotation='vertical')
plt.savefig("fig4.png")
plt.show()


# Create Northern and Southern Hemisphere DataFrames
northernHem_df = weather_df.loc[pd.to_numeric(weather_df["Lat"]).astype(float) > 0, :]
southernHem_df = weather_df.loc[pd.to_numeric(weather_df["Lat"]).astype(float) < 0, :]

# create linear regression chart for Northern Hemisphere Temp vs. Latitude
x_values = pd.to_numeric(northernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(northernHem_df['Max Temp']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Max Temperature (F)')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.41,"Equator", fontsize=10)
plt.gcf().text(.16,.51,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.31,"Tropic of Capricorn", fontsize=10)
plt.title('Northern Hemisphere - Max Temp vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig6.png")
plt.show()

# create linear regression chart for Southern Hemisphere Temp vs. Latitude
x_values = pd.to_numeric(southernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(southernHem_df['Max Temp']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Max Temperature (F)')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.41,"Equator", fontsize=10)
plt.gcf().text(.16,.51,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.31,"Tropic of Capricorn", fontsize=10)
plt.title('Southern Hemisphere - Max Temp vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig7.png")
plt.show()

# create linear regression chart for Northern Hemisphere Humidity vs. Latitude
x_values = pd.to_numeric(northernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(northernHem_df['Humidity']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Humidity')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.41,"Equator", fontsize=10)
plt.gcf().text(.16,.51,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.31,"Tropic of Capricorn", fontsize=10)
plt.title('Northern Hemisphere - Humidity vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig8.png")
plt.show()

# create linear regression chart for Southern Hemisphere Humidity vs. Latitude
x_values = pd.to_numeric(southernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(southernHem_df['Humidity']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Humidity')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.41,"Equator", fontsize=10)
plt.gcf().text(.16,.51,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.31,"Tropic of Capricorn", fontsize=10)
plt.title('Southern Hemisphere - Humidity vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig9.png")
plt.show()

# create linear regression chart for Northern Hemisphere Cloudiness vs. Latitude
x_values = pd.to_numeric(northernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(northernHem_df['Cloudiness']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Cloudiness')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.41,"Equator", fontsize=10)
plt.gcf().text(.16,.51,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.31,"Tropic of Capricorn", fontsize=10)
plt.title('Northern Hemisphere - Cloudiness vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig10.png")
plt.show()

# create linear regression chart for Southern Hemisphere Cloudiness vs. Latitude
x_values = pd.to_numeric(southernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(southernHem_df['Cloudiness']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Cloudiness')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.41,"Equator", fontsize=10)
plt.gcf().text(.16,.51,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.31,"Tropic of Capricorn", fontsize=10)
plt.title('Southern Hemisphere - Cloudiness vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig11.png")
plt.show()

# create linear regression chart for Northern Hemisphere Wind Speed vs. Latitude
x_values = pd.to_numeric(northernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(northernHem_df['Wind Speed']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Wind Speed')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.41,"Equator", fontsize=10)
plt.gcf().text(.16,.51,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.31,"Tropic of Capricorn", fontsize=10)
plt.title('Northern Hemisphere - Wind Speed vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig12.png")
plt.show()

# create linear regression chart for Southern Hemisphere Wind Speed vs. Latitude
x_values = pd.to_numeric(southernHem_df['Lat']).astype(float)
y_values = pd.to_numeric(southernHem_df['Wind Speed']).astype(float)
(slope, intercept, rvalue, pvalue, stderr) = linregress(x_values, y_values)
regress_values = x_values * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
print(f"Regression line equation is: {line_eq}")
plt.figure(figsize = (12,8))
plt.scatter(x_values, y_values, marker='o', facecolors='blue', edgecolors='black')
plt.plot(x_values,regress_values,"r-")
plt.annotate(line_eq,(6,10),fontsize=15,color="red")
plt.xlim(-90,90)
plt.ylim(-60,120)
plt.xlabel('Lat')
plt.ylabel('Wind Speed')
plt.axhline(0, c='k', alpha = .5)
plt.axhline(23.5, c='k', alpha = .4)
plt.axhline(-23.5, c='k', alpha = .4)
plt.gcf().text(.16,.51,"Equator", fontsize=10)
plt.gcf().text(.16,.61,"Tropic of Cancer", fontsize=10)
plt.gcf().text(.16,.41,"Tropic of Capricorn", fontsize=10)
plt.title('Southern Hemisphere - Wind Speed vs. Latitude Linear Regression')
print(f"The r-squared is: {rvalue}")

plt.savefig("fig13.png")
plt.show()

