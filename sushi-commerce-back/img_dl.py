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
if os.path.exists('images'):
    shutil.rmtree('images')

#we create folder 'images'
os.mkdir('images')

#function wo find image from its path:
def findNameFromPath(path):
    filename= path.split('/')[-1]
    folder= path.split('/')
    folder.pop()
    folder = "/".join(folder)+"/"
    name= filename.split('.')
    dico = {"folder":folder,
            "extension": name[1],
            "name":name[0] }
    return( dico)

def renameImage(image, string):
    dico= findNameFromPath(image)
    name = dico["name"]+ string
    newName = dico["folder"]+name+"."+dico["extension"]
    os.rename(image, newName)
    return newName


def resizeImage(image, newWidth, newHeigth):
    print("resizing" + image)
    img = cv2.imread(image, cv2.IMREAD_UNCHANGED)
    dim = (newWidth, newHeigth)
    # resize image
    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    #change the file with resized image
    cv2.imwrite(image, resized)



# param image : the path of the image we want to rename
# param scale_percent : the percent of the image we want to have
def resizeImageByPercent(image, scale_percent):    
    img = cv2.imread(image, cv2.IMREAD_UNCHANGED)
    # print('Original Dimensions : ',img.shape)
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
    # resize image
    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    # print('Resized Dimensions : ',resized.shape)
    #change the file with resized image
    cv2.imwrite(image, resized)

def downloadImage(url, x ):
    filename = "images/"+x+"/"+url.split('/')[-1]
    r = requests.get(url, allow_redirects=True)
    open(filename, 'wb').write(r.content)
    return filename

def convertImageJpegToWebP(image):
    im = Image.open(image)
    destination=image[0:-4] + ".webP"
    im.save(destination, format="webp")
    return destination
 

def compressImageAndSaveItWithNewName(image, compressionParameters, string):
    tochange = convertImageJpegToWebP(image)
    resizeImage(tochange, compressionParameters['width'], compressionParameters['height'])
    lastName = renameImage(tochange, string)
    return lastName



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
            image = downloadImage(value, folderNumber)
            newPath = compressImageAndSaveItWithNewName(image, {"width":150, "height":150}, "_miniature")
            data[x]['bigPicture']["mini"]=  "/" + newPath
            newPath = compressImageAndSaveItWithNewName(image, {"width":500, "height":500}, "_fulscreen")
            data[x]['bigPicture']["maxi"]=  "/" + newPath

            os.remove(image)

        if key== "pictures":
            i=0
            for element in value:
                # print(element)
                for newKey,newValue in element.items():
                    data[x]["pictures"][i]={"mini":"","maxi":""}
                    image = downloadImage(newValue, folderNumber)
                    
                    
                    newName = compressImageAndSaveItWithNewName(image, {"width":150, "height":150}, "_miniature")
                    data[x]["pictures"][i]["mini"] = "/" + newName
                    
                    compressImageAndSaveItWithNewName(image, {"width":800, "height":800}, "_fulscreen")
                    data[x]["pictures"][i]["maxi"] = "/" + newName

                    i = i+1

                    os.remove(image)


    x=x+1           
  
# Closing file
f.close()

print(json.dumps(data[0], indent = 4))
# #save in file
json_object = json.dumps(data, indent = 4)
print(json_object)
file = open('fakers/products_data.json',"w")
file.write(json_object)


# ending script
print("end")
exit()