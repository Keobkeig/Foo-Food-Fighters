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
import h5py
import numpy as np

import tensorflow as tf

# myflaskapp/myflaskapp/__init__.py




model = hub.KerasLayer('https://www.kaggle.com/models/google/aiy/frameworks/TensorFlow1/variations/vision-classifier-food-v1/versions/1')
labelmap_url = "https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_food_V1_labelmap.csv"
input_shape = (224, 224)
opt = tf.keras.optimizers.legacy.Adam(learning_rate=0.001)
#model.compile(optimizer=opt, loss='sparse_categorical_crossentropy', metrics=['accuracy'])
#model.fit()
path = os.path.join('food.h5')
sample_imgs = 100

with h5py.File(path, 'r') as n_file:
    total_imgs = n_file['images'].shape[0]
    read_idxs = slice(0,sample_imgs)
    im_data = n_file['images'][read_idxs]
    im_label = n_file['category'][()][read_idxs]
    e = n_file['category_names'][()]
    label_names = [x.decode() for x in n_file['category_names'][()]]

    for imagenum in range(4):
        IMAGE_arr = n_file['images'][imagenum][()]
        cv2.imshow(f'Image: {e[imagenum]}', IMAGE_arr)
        # keep window posted for 2500 msec
        cv2.waitKey(2500)
        # destroy CV2 window when done
        cv2.destroyAllWindows()

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

#image = sys.argv[1]
image = "https://www.allrecipes.com/thmb/SZjdgaXhmkrRNLoOvdxuAktwk3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228443-authentic-pho-DDMFS-4x3-0523f6531ccf4dbeb4b5bde52e007b1e.jpg"
prediction = food_classifier(image)
print("Prediction: ", prediction)
