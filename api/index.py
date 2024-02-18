from flask import Flask, jsonify, request
import os
import requests
from dotenv import load_dotenv, find_dotenv

app = Flask(__name__)

# Load environment variables from .env.local file
dotenv_path = find_dotenv('.env.local')
load_dotenv(dotenv_path)

# Define a route to fetch information about rice
@app.route("/api/rice", methods=["GET"])
def get_rice_info():
    end_point = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

    headers = {
        'x-app-id': os.getenv('APP_ID'),
        'x-app-key': os.getenv('API_KEY'),
        'x-remote-user-id': '0',
        'content-type': 'application/json',
    }

    params = {
        'query': '1 cup rice',
        'taxonomy': False,
    }

    response = requests.post(end_point, headers=headers, json=params)
    
    if response.status_code == 200:
        data = response.json()
        del data['foods'][0]['full_nutrients']
        return jsonify(data), 200
    else:
        return jsonify({"error": "Failed to fetch data from Nutritionix API"}), response.status_code

# Define a route to say "Hello, World!"
@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run(debug=True)
