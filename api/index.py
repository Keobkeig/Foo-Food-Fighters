from flask import Flask, jsonify, request
import os
import requests
from dotenv import load_dotenv, find_dotenv
from test.model import food_classifier
import psycopg2
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://127.0.0.1:5328/", methods=["GET", "POST"])

# Load environment variables from .env.local file
dotenv_path = find_dotenv('.env.development.local')
load_dotenv(dotenv_path)

# # Open a connection to the postgres database
# conn = psycopg2.connect(
#     database=os.getenv("POSTGRES_DATABASE"),
#     password=os.getenv("POSTGRES_PASSWORD"),
#     host=os.getenv("POSTGRES_HOST"),
#     user=os.getenv("POSTGRES_USER"),
#     sslmode='require'
# )

# Open a connection to the sqlite database
conn = sqlite3.connect("database.db")
conn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)")

# Route to fetch food information from Nutritionix API using a query
@app.route("/api/query", methods=["GET"])
def get_food_info(query):
    end_point = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

    headers = {
        'x-app-id': os.getenv('APP_ID'),
        'x-app-key': os.getenv('API_KEY'),
        'x-remote-user-id': '0',
        'content-type': 'application/json',
    }

    params = {
        'query': query,
        'taxonomy': False,
    }

    response = requests.post(end_point, headers=headers, json=params)
    
    if response.status_code == 200:
        data = response.json()
        del data['foods'][0]['full_nutrients']
        return jsonify(data), 200
    else:
        return jsonify({"error": "Failed to fetch data from Nutritionix API"}), response.status_code

# Test route to fetch information about grapes
@app.route("/api/python")
def hello_world():
    return get_food_info("grape")

# Route to classify food images
@app.route("/api/image", methods=["POST"])
def classify_food_image():
    image_url = request.json.get("image_url")
    if image_url is None:
        return jsonify({"error": "Please provide an image URL"}), 400
    return jsonify({"prediction": food_classifier(image_url)})

# Route to sign up a new user
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
   
    if user is not None:
        return jsonify({"error": "Username already exists"}), 400
    else:
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        conn.commit()
        cursor.close()
        return jsonify({"message": "User signed up successfully"}), 201

# Route to sign in an existing user
@app.route("/api/signin", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user is not None:
        return jsonify({"message": "User signed in successfully"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 400

@app.route("/")
def home():
    return "Welcome to the Food Classifier API!"

if __name__ == "__main__":
    app.run(debug=True)
