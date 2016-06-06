### Assignment 3 (optional) - Set up SSh Keys.
#### Due: Tuesday June 7th by Class time. 
-----

### On The Server
- Generate your ssh key either in the root folder or whatever user you created
    - make sure your logged in as that particular user
    - follow the instructions from here: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/


### On Github
- To add the ssh key you generated to github, follow this tutorial: https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/
- Warning: `pbcopy` may not work on your machine, so do what I did in class
- Note: the `~` on unix means "your home directory" so `~/.ssh` = `your/home/dir/.ssh/`
- Type the following commands: 
    - `cd ~/.ssh`
    - `more id_rsa.pub`
- Now just highlight and copy the key to your clipboard
