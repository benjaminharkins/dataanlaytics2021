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
