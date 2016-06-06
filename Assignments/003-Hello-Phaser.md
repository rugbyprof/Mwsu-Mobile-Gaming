### Assignment 3 - Hello Phaser
#### Due: Tuesday June 7th by Class time. 

-----

This assignment is simply uploading and unzipping a folder onto your server so we can make sure it is configured correctly and that you have a general understanding of how to get files onto your server.

#### Log In
- Log in to your server using some terminal client.
- For example my server (as of right now) has an ip address of `162.243.116.46`.
    - to connect as griffin: `ssh griffin@162.243.116.46` 
    - or if you want to connect as root: `ssh root@162.243.116.46`.
- Now put in your password.

#### Go to web root
- Change directory into your servers web root. For us I will assume that the web root is `/var/www/html/`. The command would be `cd /var/www/html/` 

#### Get the files
- When in the correct folder, simply type: `wget https://github.com/photonstorm/phaser/raw/master/resources/tutorials/01%20Getting%20Started/hellophaser.zip` (or copy and paste from here).
- This will use `wget` or "web get" to copy the files via http into your directory. 
- Install `unzip` by typing `sudo apt-get install unzip`
- Create the hellophaser directory by typing: `mkdir hellophaser`
- Now move your zip file into that directory: `mv hellophaser.zip hellophaser`
- Now change into that folder: `cd hellophaser`
- Now type `unzip hellophaser.zip`
- Finally put `http://your.ip.address/hellophaser` into a browser address bar, and you should see:

![](https://s3.amazonaws.com/f.cl.ly/items/350L1B2u3f3A0w2H2X0O/Screen%20Shot%202016-06-05%20at%209.58.41%20PM.png)
