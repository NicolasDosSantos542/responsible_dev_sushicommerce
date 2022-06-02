import os
from PIL import Image
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True



def convertfileToWebP(image):

    im = Image.open(image)
    destination=image[0:-4] + ".webP"
    im.save(destination, format="webp")
    return destination
 
imageList = os.listdir("Assets")
for image in imageList:
    imagePath="Assets/"+image
    convertfileToWebP(imagePath)
    os.remove(imagePath)

print(imageList)
