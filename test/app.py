import tensorflow.compat.v2 as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd
import cv2
from skimage import io

def food_classifier(image_url):
    m = hub.KerasLayer('https://www.kaggle.com/models/google/aiy/frameworks/TensorFlow1/variations/vision-classifier-food-v1/versions/1')
    labelmap_url = "https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_food_V1_labelmap.csv"
    input_shape = (224, 224)

    image = np.asarray(io.imread(image_url), dtype="float")
    image = cv2.resize(image, dsize=input_shape, interpolation=cv2.INTER_CUBIC)
    # Scale values to [0, 1].
    image = image / image.max()
    # The model expects an input of (?, 224, 224, 3).
    images = np.expand_dims(image, 0)
    # This assumes you're using TF2.
    output = m(images)
    predicted_index = output.numpy().argmax()
    classes = list(pd.read_csv(labelmap_url)["name"])
    return classes[predicted_index]

cake_url = "https://www.allrecipes.com/thmb/SZjdgaXhmkrRNLoOvdxuAktwk3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228443-authentic-pho-DDMFS-4x3-0523f6531ccf4dbeb4b5bde52e007b1e.jpg"
prediction = food_classifier(cake_url)
print("Prediction: ", prediction)
