import json
import requests
import os
from PIL import Image
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
import shutil
import cv2
import numpy as np


if os.path.exists('images'):
    shutil.rmtree('images')


os.mkdir('images')

def resizeImage(image, scale_percent):    
    image="images/0/in2000918402@2x.jpg"
    scale_percent = 10 # percent of original size
    img = cv2.imread(image, cv2.IMREAD_UNCHANGED)
    print('Original Dimensions : ',img.shape)
    
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
    
    # resize image
    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    
    print('Resized Dimensions : ',resized.shape)

    cv2.imwrite(image, resized)

def downloadImage(url, x ):
    filename = "images/"+x+"/"+url.split('/')[-1]
    r = requests.get(url, allow_redirects=True)
    open(filename, 'wb').write(r.content)
    return filename

def doYourThingWithTheImage(value,folderNumber, string=""):
    newPath = downloadImage(value,folderNumber)
    im = Image.open(newPath )
    destination=newPath[0:-4] +string+ ".webP"
    im.save(destination, format="webp")
    return destination

   



# Opening JSON file
f = open('fakers/products_data.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
x=0
for object in data:
    os.mkdir('images/' + str(x))
    for key, value in object.items():
        folderNumber = str(x)
        # if key== "pictures":
        #     for element in value:
        #         # print(element)
        #         for newKey,newValue in element.items():
        #             folder = folderNumber + "/" + "small"
        #             doYourThingWithTheImage(newValue,folderNumber, "_picture")


        if key == "bigPicture":
            newPath = doYourThingWithTheImage(value,folderNumber, "_big")
            print(value)

    x=x+1           
  
# Closing file

f.close()
print(x)