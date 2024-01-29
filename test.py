import requests
import json
import os
from dotenv import load_dotenv


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

response = requests.post(url=end_point, json=params, headers=headers)
response.raise_for_status()
data = response.json()

del data['foods'][0]['full_nutrients']

pretty_json = json.dumps(data, indent=4, skipkeys=True, sort_keys=True)

print(pretty_json)