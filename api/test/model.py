# Description: This is a simple Flask app that uses a pre-trained model to classify food images.
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 
import tensorflow_hub as hub
import numpy as np
import pandas as pd
import cv2
from skimage import io
import itertools
import os
import sys 

import numpy as np

import tensorflow as tf

# myflaskapp/myflaskapp/__init__.py

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/process-text', methods=['POST'])
def process_text():
    text = request.json.get('text')
    # Process the text here
    processed_text = food_classifier(text)
    return jsonify({'processed_text': processed_text})



# @app.route('/api/submit-file', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return 'No file part', 400
#     file = request.files['file']
#     if file.filename == '':
#         return 'No selected file', 400
#     if file:
#         # You can now use the file object
#         # For example, to save the file:
#         file.save('/api/uploads' + file.filename)
#         return 'File received', 200





model = hub.KerasLayer('https://www.kaggle.com/models/google/aiy/frameworks/TensorFlow1/variations/vision-classifier-food-v1/versions/1')
labelmap_url = "https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_food_V1_labelmap.csv"
input_shape = (224, 224)
opt = tf.keras.optimizers.legacy.Adam(learning_rate=0.001)
#model.compile(optimizer=opt, loss='sparse_categorical_crossentropy', metrics=['accuracy'])
#model.fit()

def food_classifier(image_url):
    image = np.asarray(io.imread(image_url), dtype="float")
    image = cv2.resize(image, dsize=input_shape, interpolation=cv2.INTER_CUBIC)
    # Scale values to [0, 1].
    image = image / image.max()
    # The model expects an input of (?, 224, 224, 3).
    images = np.expand_dims(image, 0)
    # This assumes you're using TF2.
    output = model(images)
    predicted_index = output.numpy().argmax()
    classes = list(pd.read_csv(labelmap_url)["name"])
    return classes[predicted_index]

# Test the model using images in your directory 

# image = sys.argv[1]
# cake_url = "https://www.allrecipes.com/thmb/SZjdgaXhmkrRNLoOvdxuAktwk3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228443-authentic-pho-DDMFS-4x3-0523f6531ccf4dbeb4b5bde52e007b1e.jpg"
# prediction = food_classifier(image)
# print("Prediction: ", prediction)
