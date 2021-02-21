import requests
import base64
from os import listdir
from os.path import isfile, join
import numpy as np
import json
# Read images from each category
def get_prediction(image_data):
    url = 'https://k7acq76z66.execute-api.us-east-1.amazonaws.com/Predict/b20ba86b-ea53-4dfd-a92c-69772ab90451'
    r = requests.post(url, data=image_data)
    response_raw = getattr(r,'_content').decode("utf-8")
    response = json.loads(response_raw)
    # print(response)
    return response
# Path to the folder containing images of category 1
path_category1 = "static/images"
category1_images_list = [f for f in listdir(path_category1) if isfile(join(path_category1, f))]
num_samples = len(category1_images_list)
prediction_category1 = np.zeros((num_samples,2))
for a in range(0,num_samples):
    with open(path_category1 + '/' + category1_images_list[a], "rb") as image:
        image_category1 = base64.b64encode(image.read())
    output = get_prediction(image_category1)
    print(output["predicted_label"])
    # Name of your category, for example
    # name could be 'cats' or `dogs`
    # Its the name that you gave the subfolders
    # if (output['predicted_label'] == 'Front'):
    #     prediction_category1[a,0] = 0
    # else:
    #     prediction_category1[a,0] = 1
    # prediction_category1[a,1] = output['score']

