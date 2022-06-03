import os
from PIL import Image
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
import personal


imageList = os.listdir("sushi-commerce-back/alibaba")
for image in imageList:
    imagePath="sushi-commerce-back/alibaba/"+image
    personal.convertfileToWebP(imagePath)
    os.remove(imagePath)

print(imageList)
