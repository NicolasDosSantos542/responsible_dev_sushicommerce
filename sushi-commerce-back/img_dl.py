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
import personal

# if images folder exist, we delete it
if os.path.exists('images'):
    shutil.rmtree('images')

#we create folder 'images'
os.mkdir('images')



# Opening JSON file
f = open('fakers/products_data copy.json',"r")
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# # Iterating through the json
# # list
x=0
for object in data:
    os.mkdir('images/' + str(x))
    print(x)
    for key, value in object.items():
        folderNumber = str(x)
        if key == "bigPicture":
            data[x]['bigPicture']={"mini":"","maxi":""}
            image = personal.downloadImage(value, folderNumber)
            newPath = personal.compressImageAndSaveItWithNewName(image, {"width":150, "height":150}, "_miniature")
            data[x]['bigPicture']["mini"]=  "/" + newPath
            newPath = personal.compressImageAndSaveItWithNewName(image, {"width":500, "height":500}, "_fulscreen")
            data[x]['bigPicture']["maxi"]=  "/" + newPath

            os.remove(image)

        if key== "pictures":
            i=0
            for element in value:
                # print(element)
                for newKey,newValue in element.items():
                    data[x]["pictures"][i]={"mini":"","maxi":""}
                    image = personal.downloadImage(newValue, folderNumber)
                    
                    
                    newName = personal.compressImageAndSaveItWithNewName(image, {"width":150, "height":150}, "_miniature")
                    data[x]["pictures"][i]["mini"] = "/" + newName
                    
                    personal.compressImageAndSaveItWithNewName(image, {"width":800, "height":800}, "_fulscreen")
                    data[x]["pictures"][i]["maxi"] = "/" + newName

                    i = i+1

                    os.remove(image)


    x=x+1           
  
# Closing file
f.close()


personal.saveJSONinFile(data, 'fakers/products_data.json')
# ending script
print("end")
exit()