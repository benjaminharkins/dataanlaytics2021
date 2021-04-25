# SQLalchemy Challenge



#########################################################
#Please find the app.py code below with inline comments.#
#########################################################
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
measure = Base.classes.measurement
Station = Base.classes.station

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/measurements<br/>"
        f"/api/v1.0/stations"
    )


@app.route("/api/v1.0/measurements")
def measurements():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all measurements"""
    # Query all passengers
    results = session.query(measure.id, measure.station, measure.date, measure.prcp, measure.tobs).all()

    session.close()

    # Convert list of tuples into normal list
    all_measurements = list(np.ravel(results))

    return jsonify(all_measurements)


@app.route("/api/v1.0/stations")
def stations():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of station data including the name, latitude, and longitude of each station"""
    # Query all stations
    results = session.query(station.id, station.station, station.name, station.latitude, station.longitude, station.elevation).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_stations
    all_stations = []
    for name, age, sex in results:
        stations_dict = {}
        stations_dict["id"] = id
        stations_dict["station"] = station
        stations_dict["name"] = name
        stations_dict["latitude"] = latitude
        stations_dict["longitude"] = longitude
        stations_dict["elevation"] = elevation
        all_stations.append(stations_dict)

    return jsonify(all_stations)


if __name__ == '__main__':
    app.run(debug=True)

#################################################################
#################################################################

###################################################################
#Please find the climate notebook code below with inline comments.#
###################################################################

##importing dependencies

%matplotlib inline
from matplotlib import style
style.use('fivethirtyeight')
import matplotlib.pyplot as plt


import numpy as np
import pandas as pd
import datetime as dt


# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
from sqlalchemy import desc

from flask import Flask, jsonify


# create engine to hawaii.sqlite
engine = create_engine("sqlite:///hawaii.sqlite", echo=False)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# View all of the classes that automap found
Base.classes.keys()


# Save references to each table

measure = Base.classes.measurement
Station = Base.classes.station


# Create our session (link) from Python to the DB
session = Session(engine)

# Find the most recent date in the data set.

#session.query(measure.station, measure.date).order_by(desc(measure.date)).first()

most_recent = session.query(measure.station, measure.date).order_by(desc(measure.date)).first()
recent_date = session.query(measure.date).order_by(desc(measure.date)).first()

print(recent_date)
print(most_recent)

#testing query
#print(session.query(measure))

recent = session.query(measure.station, measure.date).order_by(desc(measure.date))

#recent_day = pd.DataFrame(recent)

recent_df = pd.DataFrame(recent)

#Testing variable
#recent_df.head(20)

#Testing variable
#recent_df['date'] = pd.to_datetime(recent_df['date'], format='%Y%m%d')

#Converting date column to integer format
#recent_day['date'] = recent_day['date'].astype(int)
recent_df['date'] = recent_df['date'].str.replace(r'\D', '').astype(int)

#Converting date to date format
#recent_df['date'] = pd.to_datetime(recent_df['date'], format='%Y%m%d')

recent_df.head(20)

print (recent_df.dtypes)

# Design a query to retrieve the last 12 months of precipitation data and plot the results. 
# Starting from the most recent data point in the database. 
engine.execute('SELECT * FROM Station LIMIT 12').fetchall()


engine.execute('SELECT * FROM measurement LIMIT 12').fetchall()


# Calculate the date one year from the last date in data set.
#one_year_ago = dt.date(recent_df[1][1]) - dt.timedelta(days=365)
one_year_ago = dt.date(2017, 8, 23) - dt.timedelta(days=365)
#one_year_ago = dt.datetime.strptime(recent_date[0], "%Y-%m-%d")- dt.timedelta(days=366)
print(one_year_ago)

# Perform a query to retrieve the data and precipitation scores

prcp_data = session.query(measure.date, measure.prcp).\
    filter(measure.date > one_year_ago).\
    order_by(measure.date).all()

print(prcp_data)

# Save the query results as a Pandas DataFrame and set the index to the date column

prcp_data_df = pd.DataFrame(prcp_data)
prcp_data_df.head(20)


# Sort the dataframe by date
sorted_prcp_data_df = prcp_data_df.sort_values(by="date", ascending=False, na_position="first")
sorted_prcp_data_df.head(20)

# Use Pandas Plotting with Matplotlib to plot the data

ax = prcp_data_df.plot(figsize=(8,4))
ax.set_title(f"Precipitation Analysis ({recent_date[0]} to {one_year_ago}")
ax.set_ylabel('Frequency')
plt.show()

# Use Pandas to calcualte the summary statistics for the precipitation data
sorted_prcp_data_df.describe()


# Design a query to calculate the total number stations in the dataset
num_stations = session.query(measure).group_by(measure.station).count()
print("There are {} stations available.".format(num_stations))

# Design a query to find the most active stations (i.e. what stations have the most rows?)
# List the stations and the counts in descending order.
active_station = session.query(measure.station, func.count(measure.station).label("count")).group_by(measure.station).order_by(desc("count")).all()
active_station

# Using the most active station id from the previous query, calculate the lowest, highest, and average temperature.
most_active = session.query(measure.station, func.count(measure.station).label('count')).group_by(measure.station).order_by(desc("count")).limit(1)[0][0]
most_active


temp = [func.min(measure.tobs),func.max(measure.tobs),func.avg(measure.tobs)]
session.query(*temp).filter(measure.station==most_active).all()

#testing variable
#temp_obs = session.query(measure.tobs).order_by(desc(measure.date)).all()


#temp_obs = session.query(measure.date, measure.tobs).filter(measure.station==most_active).filter(measure.date >= one_year_ago).order_by(desc(measure.date)).all()
temp_obs1 = session.query(measure.date, measure.station, measure.tobs).filter(measure.date >= one_year_ago).all()
temp_obs_df = pd.DataFrame(temp_obs1)

#temp_obs_df = pd.DataFrame(temp_obs)
#temp_obs_df.head(20)

temp_obs_df["station"].unique()

temp_obs2_df = temp_obs_df.loc[temp_obs_df["station"]!="USC00519281"]
#temp_obs2_df.head(20)
temp_obs2_df["station"].unique()


# Using the most active station id
# Query the last 12 months of temperature observation data for this station and plot the results as a histogram
plt.hist(temp_obs_df['tobs'], bins=12)
plt.xlabel("Recorded Temperature")
plt.ylabel("Frequency")
plt.title("Station Analysis (8/24/16 to 8/23/17) for Station " + most_active)
plt.legend(["tobs"])
plt.show()


# Close Session
session.close()