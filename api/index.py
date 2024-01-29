from flask import Flask, request, jsonify

import os
from dotenv import load_dotenv

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/rice")
def rice():

    end_point = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

    load_dotenv()

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

    response = request.post(end_point, headers=headers, params=params)
    response.raise_for_status()
    data = response.json()

    del data['foods'][0]['full_nutrients']

    pretty_json = jsonify.dumps(data, indent=4)

    return pretty_json, 200, {'Content-Type': 'application/json'}