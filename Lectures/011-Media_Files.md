## Media Files

### Converting Sound Files

Our book recommended having at least two versions of a sound file when using them as assets in a game. To convert one sound file from another is an easy task when using your server.


### Converting Image Files



##Image Magick

#### Original Image
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom.png)

Now let's replace the "white" color with "red":
```bash
convert super-mushroom.png -fuzz 40% -fill red -opaque white super-mushroom-1.png
```
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom-1.png)

Next, let's convert the "black" to pure alpha clear. This is a two step process.

```bash
# Make a mask (something to overlay the next image with)
# If your converting "white" to be the alpha, place "-negate" right after "-seperate" in the following command

convert super-mushroom-2.png -colorspace HSB -separate image_mask.png

# This command creates image_mask-0.png,image_mask-1.png,image_mask-2.png

# Using the image-mask-1.png
convert super-mushroom-2.png -alpha Off  image_mask-1.png -compose CopyOpacity -composite PNG32:super-mushroom-2-alpha.png
# This takes the input file super-mushroom-2.png and puts the clear one in super-mushroom-2-alpha.png
```
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super-mushroom-2-alpha.png)

convert -trim super-mushroom-1.png super-mushroom-2.png
