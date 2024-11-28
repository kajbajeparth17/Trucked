from flask import Flask, jsonify, request
from threading import Thread
from database_helper import Database
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from flask import jsonify

app = Flask('')

@app.route('/')
def home():
  with Database() as db:
    result = db("SELECT * from Ride;")
    result = result.fetchall()
  return jsonify(result)

@app.route('/login', methods=['POST'])
def user_login():
  if request.method in ['POST', 'OPTIONS']:
    with Database() as db:
      # json_dict = {"user_id":"admin", "password":"abcd"}
      json_dict = request.get_json()
      user = json_dict["user_id"]
      pssw = json_dict["password"]

      # vulnerable to SQL injection. Fix later.
      result = db(
        f' SELECT password, is_admin FROM Users WHERE username = "{user}" ')
      # result = db("SELECT * FROM Users")
      users = result.fetchall()

    if len(users) == 0:
      return jsonify({"message": "No users Found"})

    if users[0][1] == 1:
      return jsonify({"message": "Please Log in Through the Admin Portal"})

    if check_password_hash(users[0][0], pssw):
      return jsonify({"message": "Success"})
    return jsonify({"message": "Failure"})


@app.route('/signIn', methods=['POST'])
def signIn():
  if request.method == "POST":
    with Database() as db:
      json_dict = request.get_json()
      user = json_dict["user_id"]
      pssw = json_dict["password"]

      hashed_password = generate_password_hash(pssw)

      duplicates = db(f'SELECT username FROM Users WHERE username = "{user}" ')
      duplicates = duplicates.fetchall()
      if len(duplicates) == 0:
        result = db(
          f' INSERT INTO Users(username, password, is_admin) VALUES("{user}", "{hashed_password}", false)'
        )
        return jsonify({"message": "success"})

      return jsonify({"message": "Failure: Username Taken"})


@app.route('/searchRide', methods=['POST'])
def search():
  with Database() as db:
    json_dict = request.get_json()

    start = json_dict["start"]
    end = json_dict["end"]

    startId = db(f'SELECT id FROM Locations WHERE name = "{start}"')
    startId = startId.fetchall()[0][0]

    endId = db(f'SELECT id FROM Locations WHERE name = "{end}"')
    endId = endId.fetchall()[0][0]

    result = db(f'SELECT id,volume FROM Ride WHERE start_location_id = "{startId}" AND end_location_id = "{endId}" AND booked = 0')
    
    result = result.fetchall()

    if len(result) == 0:
      return jsonify({"Message": "Not Rides Found"})
    
    keys = ["Id", "Volume"]
    res = list_to_dict(result, keys)

    return jsonify(res)


@app.route('/bookRide', methods=['POST'])
def book():

  if request.method == 'POST':

    with Database() as db:
      json_dict = request.get_json()

      ridername = json_dict["username"]
      rider_id = db(f'SELECT id FROM Users WHERE username = "{ridername}"')
      rider_id = rider_id.fetchone()[0]

      ride_id = json_dict["ride_id"]

      db(
        f'''
          UPDATE Ride
          SET rider_id = {rider_id}, booked = 1
          WHERE id = {ride_id}
        '''
      )

      return jsonify({"Message": "Success"})

@app.route('/addLocation', methods=['POST'])
def add_locations():

  with Database() as db:
    json_dict = request.get_json()

    name = json_dict["location"]

    duplicates = db(f'SELECT count(name) FROM Locations WHERE name = "{name}"')
    duplicates = duplicates.fetchall()

    if duplicates[0][0] == 0:
      db(f'INSERT INTO Locations(name) VALUES("{name}")')
      return jsonify({"Message": "success"})

    return jsonify({"Message": "Location Already Exists"})


@app.route('/addRide', methods=['POST'])
def add_services():

  if request.method == 'POST':

    with Database() as db:

      json_dict = request.get_json()

      drivename = json_dict["username"]
      driver_id = db(f'SELECT id FROM Users WHERE username = "{drivename}"')
      driver_id = driver_id.fetchone()[0]

      start = json_dict["start"]
      start_id = db(f'SELECT id FROM Locations WHERE name = "{start}"')
      start_id = start_id.fetchone()[0]

      destination = json_dict["dest"]
      destination_id = db(f'SELECT id FROM Locations WHERE name = "{destination}"')
      destination_id = destination_id.fetchone()[0]

      volume = json_dict["volume"]

      now = datetime.datetime.now()
      now = now.date()

      db(
        f'''
        INSERT INTO Ride(driver_id, start_location_id, end_location_id,volume) 
        VALUES({driver_id}, {start_id}, {destination_id}, {volume});
        '''
      )
      
      #todo update json
      return "success"

def list_to_dict(data, keys):
    return [dict(zip(keys, row)) for row in data]

app.run(host='0.0.0.0', port=81)


