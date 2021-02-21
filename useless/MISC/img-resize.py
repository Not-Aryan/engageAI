# Improting Image class from PIL module  
from PIL import Image  
  
# Opens a image in RGB mode  
im = Image.open("static/images/image1.jpg")  

im.show()


left = 240
top = 60
right = 1040
bottom = 660


im1 = im.crop((left, top, right, bottom)) 

im1.show() 