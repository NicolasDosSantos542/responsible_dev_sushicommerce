import personal
from ast import Return
from fileinput import filename
import json
from lib2to3.pytree import convert
import requests
import os
from PIL import Image
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
import shutil
import cv2
import numpy as np

# if images folder exist, we delete it
if os.path.exists('subCatImages'):
    shutil.rmtree('subCatImages')

#we create folder 'images'
os.mkdir('subCatImages')



# Opening JSON file
f = open('sushi-commerce-back/fakers/subCategories_data copy.json',"r")
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# # Iterating through the json
# # list
x=0
for object in data:
    os.mkdir('subCatImages/' + str(x))
    print(x)
    for key, value in object.items():
        folderNumber = str(x)
        if key == "img":
            data[x]['img']={"mini":"","maxi":""}
            image = personal.downloadImage(value, folderNumber, "subCatImages/")
            newPath = personal.compressImageAndSaveItWithNewName(image, {"width":150, "height":150}, "_miniature")
            data[x]['img']["mini"]=  "/" + newPath
            newPath = personal.compressImageAndSaveItWithNewName(image, {"width":500, "height":500}, "_fulscreen")
            data[x]['img']["maxi"]=  "/" + newPath

            os.remove(image)

       


    x=x+1           
  
# Closing file
f.close()


personal.saveJSONinFile(data, 'sushi-commerce-back/fakers/subCategories_data.json')
# ending script
print("end")
exit()