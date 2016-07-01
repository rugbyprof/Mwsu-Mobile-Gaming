## Multiplayer Fun
- **Due**: July 5<sup>th</sup> by class time.
- **Late Projects:** Will NOT be graded. 

### Guidelines
- Projects that are not on github, will not be graded. 
- Projects that do not run, will not be graded.
- You can work in groups of 2-3 not 4. Don't ask.
- All work is expected to be done solely by the individuals in the group. Any collaboration with other groups will result in a grade of 0 (zero) on the assignment.
- Each project will also contain a references file called `references.md` in which all websites in which your group obtianed example code from will be listed in a numbered list.
- Your program will be commented, and again, any help obtained should be cited in the comments.

### Important
- Each member of the group will have a copy of the code in their repository and on their server. 
- The poor member who doesn't have a copy will get a zero. So don't do that to your self.
- To finalize your submission, your group (only one person needs to do this) will send me an email with the following information:
- **Subject:** 2D Program 6
- The body of your email will contain everyone's name, a link to the game on their server, and a link to their github repo.
- Example email below:

> **Subject:** 2D Program 6<br><br>
> Here are the names and links for my group:<br>
John Smith<br>
Roster #11<br>
  http://120.34.43.111/Mwsu-2D-Gaming-Smith/Program-6<br>
  http://github.com/smittyville/Mwsu-2D-Gaming-Smith/<br><br>
  Jane Doe<br>
  Roster # 12<br>
  http://171.55.43.23/Mwsu-2D-Gaming-Doe/Program-6<br>
  http://github.com/doedoebird/Mwsu-2D-Gaming-Doe/<br>  

### Overview

At present the example code [here](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/blob/master/multiPlayer.zip) creates a multiplayer environment, however it is missing a couple of key elements, namely multiple players! You will need to add the necessary changes to the client and server that displays each additional player. In class we already discussed the existing communication done between client and server, and we discovered that the server tells each player about all other players, but that as a client finds out about a player, it never actually creates an instance of the player object. So you will need to remedy that problem.

### Requirements

- A player (dude) will show up on each instance of the game and will be the same color of the original instance.
- When the original player moves, it will be mirrored on each instance of the game. 
- Performance like lag or jerky behavior is ok, as long as it is a communication problem, not an implementation issue (meaning your programming missed something or was logically incorrect)
- Collision or addtional methods implemented to make my game play more exciting will be greatly appreciated and will be looked upon favoribly.

### Running your game

To run your game, I will clone your repository and run it locally on my machine. Therefore be extra sure that your code is in each team members repository.

### Brackets

There is a **Brackets** plugin that will let you run `node` locally on your machine. Of course `node` needs to be installed (in gitbash for example). Here is a link to the plugin on github: https://github.com/Acconut/brackets-nodejs. It has instructions on how to install and use. 
