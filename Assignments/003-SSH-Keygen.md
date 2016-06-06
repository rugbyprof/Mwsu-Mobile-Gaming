### Assignment 3 (optional) - Set up SSh Keys.
#### Due: Tuesday June 7th by Class time. 
-----

### On The Server
- Generate your ssh key as root or as the user you added to your server.
    - Make sure your logged in as whichever user your going to generate the key for.
    - Follow the instructions from [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)


### On Github
- First generate the key using this [tutorial](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).
- Warning: The tutorial uses `pbcopy` wich may not work on some distros, so do what I did in class
- Note: the `~` on unix means "your home directory" so `~/.ssh` = `your/home/dir/.ssh/`
- Type the following commands: 
    - `cd ~/.ssh`
    - `more id_rsa.pub`
- Now just highlight and copy the key to your clipboard
- Continue with the tutorial.
