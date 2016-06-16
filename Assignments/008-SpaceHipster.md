# Not Done

## Space Hipster
- **Due**: June 19<sup>th</sup> by 11:59 p.m.
- **Late Projects:** Will NOT be graded. 

### Guidelines
- Projects that are not on github, will not be graded. 
- Projects that do not run, will not be graded.
- You can work with a partner (that is two people max).
- All work is expected to be done solely by the individual(s). Any collaboration with other individuals or gropus will result in a grade of 0 (zero) on the assignment.

### Important
- You need to have a copy of your code in your repository and on your server. 
- If your working with a partner, this applies to both individuals.
- To finalize your submission, send me an email with the following information (if you have a partner, only one of you send the email):
- **Subject:** 2D Program 4
- The body of your email will contain your name, a link to the assignment on your server, and a link to your github repo.
- Example email below:

>Subject: 2D Program 4
>
>Name John Smith<br>
Here are the links for my assignment:<br>
Roster #11<br>
http://120.34.43.111/Mwsu-2D-Gaming-Smith/Program-4<br>
http://github.com/smittyville/Mwsu-2D-Gaming-Smith/<br>

(if you have a partner repeat lines above here)

### Actual Assignment

Were going to use an existing asteroids like game called space hipster as the basis for our weekend assignment. As it stands, space hipster has some pretty ugly "asteroids" that float around without collisions (unless its the player), and the goal is for the placer to fly around and pick up nuggets for points. The ship is a design that doesn have sides, its basically a pulsating square. It doesn't shoot any bullets, and it's method of movement is: click the mouse somewhere and it changes it's angle of movement towards the click. We are going to change many things about this game and make it better. 


### Resources
- Download starter code [here](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/blob/master/Example_code/spacehipster.zip) (click "view raw" to start download). 
- Game based on a tutorial from [here](https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/).
- Helper code to make asteroids collide can be found  [here](http://examples.phaser.io/_site/view_full.html?d=arcade%20physics&f=group+vs+self.js&t=group%20vs%20self).
- A bullet firing example can be seen [here](http://phaser.io/examples/v2/games/invaders)
- A asteroids ship movement example [here](http://phaser.io/examples/v2/arcade-physics/asteroids-movement)


### Requirements

- The number of asteroids at the start of the game is insane, change that to an amount based on the level of the game. Here are some suggestions, but alter them to your liking:
    - Easy = (25,50) 
    - Medium (50,150)
    - Hard (150,250)
- In your global vars section, have a variable called `skillLevel` that is one of the three settings.


- The asteroids are "scaled" in size based on some random value. And the velocity of each is also randomly generated. Both of these random distributions are uniform, and we don't want that.
    - What we want is to generate more "small" asteroids than large asteroids.
    - We also want "small" asteroids to have a higher velocity than larger ones.
- Write a function called `generateAsteroid` (singular) that creates a single asteroid with a random size where small occurs more than large and assigns a velocity accordingly. 
- Have a variable in your global vars section called `asteroidSize` that ranges from 1 - 100. If the value is 0 all the asteroids generated will be small and if the value is 100 all the asteroids will be large. So 50 would mean about 50/50 between large and small. 
- We should discuss asteroid size in class a little more.

- Using the asteroids ship movement example, change the existing ship in space hipster to match the one in the example. It doesn't have to be the exact sprite, but it should mimic the behavior.

- Make it so the ship can fire bullets. Not round ones either. You need to use the longer photon looking ones. Why? Because matching the angle to the ship when firing is fun.

- Destroy asteroids when hit by a bullet. Any animation will do (like from our coins game). 
