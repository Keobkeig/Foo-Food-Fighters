import os
import requests 
import json
from dotenv import load_dotenv, find_dotenv

end_point = "https://trackapi.nutritionix.com/v2/natural/nutrients"

# Load environment variables from .env.local file
dotenv_path = find_dotenv('.env.local')
load_dotenv(dotenv_path)

# Print loaded environment variables for verification
print(os.environ.get('APP_ID'))
print(os.environ.get('API_KEY'))

# Prepare headers with environment variables
headers = {
    'Content-Type': 'application/json',
    'x-app-id': os.getenv('APP_ID'),
    'x-app-key': os.getenv('API_KEY'),
    'x-remote-user-id': '0'
}

# Prepare data for the request
data = {
    "query": "grape"
}

# Send the POST request
response = requests.post(url=end_point, headers=headers, json=data)

# Handle the response
if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=4))
else:
    print("Error:", response.status_code)
    print(response.text)
