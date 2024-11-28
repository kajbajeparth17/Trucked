import sqlite3
import datetime
from database_helper import Database


now = datetime.datetime.now()
now = now.date()

with Database() as db:
    db(
        '''
			CREATE TABLE Users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL,
			is_admin BOOLEAN DEFAULT 0
			);
			CREATE TABLE sqlite_sequence(name,seq);
			CREATE TABLE Locations (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL
			);
			CREATE TABLE Ride (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			driver_id INTEGER,
			rider_id INTEGER,
			start_location_id INTEGER,
			end_location_id INTEGER,
			volume INTEGER,
			booked BIT DEFAULT 0,
			date DATE,
			FOREIGN KEY (start_location_id) REFERENCES Locations(id),
			FOREIGN KEY (end_location_id) REFERENCES Locations(id),
			FOREIGN KEY (driver_id) REFERENCES Users(id),
			FOREIGN KEY (rider_id) REFERENCES Users(id),
			(rider_id) REFERENCES Users(id)
			);

			INSERT INTO  Users(username, password, is_admin) VALUES("admin", "pbkdf2:sha256:260000$obEFfW0FEPqUWP6y$32fa03aa0dc7f374ea70670368da81c11e827d8b2c814e2c83cd96f069e1ec89", true);
		'''
	)


# conn = sqlite3.connect("ride_database.db")
# c = conn.cursor()
# SQL_STATEMENT = '''
# CREATE TABLE Users (
#   id INTEGER PRIMARY KEY AUTOINCREMENT,
#   username TEXT NOT NULL UNIQUE,
#   password TEXT NOT NULL,
#   is_admin BOOLEAN DEFAULT 0
# );
# CREATE TABLE sqlite_sequence(name,seq);
# CREATE TABLE Locations (
#   id INTEGER PRIMARY KEY AUTOINCREMENT,
#   name TEXT NOT NULL
# );
# CREATE TABLE Ride (
#   id INTEGER PRIMARY KEY AUTOINCREMENT,
#   driver_id INTEGER NOT NULL,
#   rider_id INTEGER,
#   start_location_id INTEGER NOT NULL,
#   end_location_id INTEGER NOT NULL,
#   volume INT NOT NULL,
#   booked BIT DEFAULT 0,
#   date DATE NOT NULL,
#   FOREIGN KEY (start_location_id) REFERENCES Locations(id),
#   FOREIGN KEY (end_location_id) REFERENCES Locations(id),
#   FOREIGN KEY (driver_id) REFERENCES Users(id),
#   FOREIGN KEY (rider_id) REFERENCES Users(id),
# );

# INSERT INTO  Users(username, password, is_admin) VALUES("admin", "pbkdf2:sha256:260000$obEFfW0FEPqUWP6y$32fa03aa0dc7f374ea70670368da81c11e827d8b2c814e2c83cd96f069e1ec89", true); '''
# c.execute(SQL_STATEMENT)

# # Remember to save + close
# conn.commit()
# conn.close()