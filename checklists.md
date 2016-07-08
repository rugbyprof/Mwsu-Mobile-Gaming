### Program 4
- Global var called skillLevel is one of the three settings: easy medium or hard and has an impact on how many asteroids are generated.
- Asteroids are "scaled" in size based on some random value. 
- The velocity of each asteroid is randomly generated. 
- More "small" asteroids than large asteroids are generated
- Velocity is based on size of the asteroids
- There is a function called generateAsteroid (singular) that creates a single asteroid with a random size where small occurs more than large and assigns a velocity accordingly.
- Have a variable in your global vars section called asteroidSize that ranges from 1 - 100 and controls the distribution of asteroid sizes.
- Ship moves like the tradition asteroid game (rotates 360 degrees, and thrusts in the direction its pointing)
- The ship sprite is different than the tutorial
- The ship fires long bullets correctly oriented 
- Destroy asteroids when hit by a bullet. Any animation will do (like from our coins game).

### Program 5
- A randomly generated tilemap is generated
- Every re-load of the game creates a new instance in a random configuration with an entrance and exit
- A player (sprite) is loaded onto the map and can move around in the passageways
- Collision between sprite and walls must occur

### Program 6
- A player (dude) shows up on each instance of the game 
- The player is the same color of all instances
- When the original player moves, it is mirrored on each instance of the game
- Performance like lag or jerky behavior is ok
- Collision or addtional methods implemented is extra credit.

### Program 7
- A character that moves around and captures coins
- Each coin adds to the players score
- When the player drops through the floor it will start the new level
- The new level looks noticeably different from the previous level
- The new level shows the current score (not zero)
- The combined score (total) is shown at the end of the game.
