from flask import Flask, jsonify, request
import os
import requests
from test import food_classifier 
from dotenv import load_dotenv, find_dotenv

app = Flask(__name__)

# Load environment variables from .env.local file
dotenv_path = find_dotenv('.env.local')
load_dotenv(dotenv_path)

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

if __name__ == "__main__":
    app.run(debug=True)
