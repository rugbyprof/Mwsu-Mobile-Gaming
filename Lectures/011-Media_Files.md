## Media Files

### Converting Sound Files

Our book recommended having at least two versions of a sound file when using them as assets in a game. To convert one sound file from another is an easy task when using your server.


### Converting Image Files



##Image Magick

#### Original Image
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom.png)

### 1 - Replace Color
Now let's replace the "white" color with "red":
```bash
convert super-mushroom.png -fuzz 40% -fill red -opaque white super-mushroom-1.png
```
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom-red.png)

### 2 - Trim Edges
Ok, let's trim the extra stuff off the edges:
```
convert -trim super-mushroom-red.png super-mushroom-trimmed.png
```
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom-trimmed.png)

### 3 - Add Alpha
Next, let's convert the "black" to pure alpha clear. This is a two step process.
```bash
# Make a mask (something to overlay the next image with)
# If your converting "white" to be the alpha, place "-negate" right after "-seperate" in the following command

convert super-mushroom-2.png -colorspace HSB -separate image_mask.png

# This command creates image_mask-0.png,image_mask-1.png,image_mask-2.png

# Using the image-mask-1.png
convert super-mushroom-trimmed.png -alpha Off  image_mask-1.png -compose CopyOpacity -composite PNG32:super-mushroom-alpha.png
# This takes the input file super-mushroom-trimmed.png and puts the clear one in super-mushroom-alpha.png
```
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom-alpha.png)

### 4 - Resize

#### Using Percent
```bash
# This will convert the image to 50% of it's original size
convert -resize 50% super-mushroom-alpha.png super-mushroom-50.png
```
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom-50.png)

#### Using Geometry
See [geometry](http://www.imagemagick.org/script/command-line-processing.php#geometry) for many examples of how to resize.

```bash
# This will convert the image to a width of 48 while maintaining aspect ratio 
convert -resize 48x super-mushroom-alpha.png super-mushroom-48x.png

# This will convert the image to a height of 48 while maintaining aspect ratio 
convert -resize x48 super-mushroom-alpha.png super-mushroom-x48.png

# This will convert the image to a height of 48 while still maintaining aspect ratio 
convert -resize 48x48 super-mushroom-alpha.png super-mushroom-48x48.png

# This will convert the image to a height of 48x48 screw aspect ratio
convert -resize 48x48! super-mushroom-alpha.png super-mushroom-48x48.png
```

![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super_mushroom/super-mushroom-48x48.png)
(48x48)
