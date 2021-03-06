## Random Map Generation

![](http://f.cl.ly/items/3Y0P3B1U1W2u2N1E2z3D/random_map.png)

Random maze generation is a "thing". Check it out on [wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm). We are going to incorporate this method to create a random "world" for us to play in. The idea came to me because I want to employ the A-Star algorithm to have NPC's (Non Player Character) chase a player (or at least "stalk" the player). We could use this that Phaser provides us: [Accelerate To Object](http://phaser.io/examples/v2/p2-physics/accelerate-to-object), and we might, but we also need the NPC to go around objects, and that's where [A-Star](https://github.com/prettymuchbryce/easystarjs) comes in. 

### Example:

http://www.emanueleferonato.com/2015/07/03/pure-javascript-a-maze-solving-with-a-bit-of-magic-thanks-to-phaser/

### Algorithms

- http://www.jamisbuck.org/presentations/rubyconf2011/index.html
- http://weblog.jamisbuck.org/2011/2/7/maze-generation-algorithm-recap

### Assignment:




### Game Ideas

- Drop Claymore
- As the player reaches rooms in your maze, load a tile map for a fight against the enemy who chases you. The enemy can gain new "powers" each time you defeat him.
- Map visibility
    1. Full visibility in player's immediate view
    2. Memory/partial visibility of areas player has seen before
    3. no visibility of areas player has not yet seen
- let the player be able to take a certain number of hits before dying (with a life bar).
- Have random power ups that the player can pickup in the dungeon. Examples: invisibility, shield, speed up, slow down time/stop time.
- The player can move faster (run), which depletes stamina points (or stamina bar) that regenerates slowly.
- multiple types of attacks i.e ranged, spells, melee
- item drops from enemies for power ups or amor/equipment
- enemy can drop boom
- add a supper enemy(mave faster)
- player must move toward a goal; enemy generation is centered around the goal. (think capture the flag)
- have enemy randomly teleport after a period of time (closer of course to block your path)
- Some enemies take different number of hits as well, might resist others if different types of attacks. 
- Walls could be breached by repeated weapon hits OR certain sections of wall could be booby-trapped to explode if hit by         weapon, killing any sprite within a defined radius. (or a combination of the two)
- Easy/Hard difficulty. Could affect number of enemies, visibility, how aggressive the enemies are, etc
- A finite number of charges to break wall tile.
- After collecting a number of key items, the player goes into a game breaker state and is able to break through walls
- After killing certain number of enemies, the player gets random powers like breaking the walls, shield that protects the player from the enemies for a specific time.
- Filling up random room (created with loop of tiles) with 2-3 enemies and a life coin. Adding a power up coin which makes player walk through the walls but not the enemies for specific amount of time (say 5 or 10 seconds) which will be usefull to collect the life coin inside the room.
- Have camera zoomed and centered to create a more immersive experience


## Teams

#### GameWorld
- Nagendra Babu Pasupuleti
- Nanda Kishore Reddy Thineti
- Clive Matiku

#### Beardgang
- Christopher James
- Adrian Hurst

#### I Hate People
- Lewis Confair

#### Sundrin Gaming Incorporated
- Devin Ritter
- Sam Kocher

#### Wolverines
- Christian Norfleet
- Scott Schumacher
- Damien Moeller
 
#### Mighty Morphin' Power Ranger
- Taylor Kirk

###SL Gaming
 -Charith Perera
 
#### Jtran
- Johnny Tran

### S0URC3 C0D3

- Muni Bhupathi Dandu
- Shashnak Namala

### DiamondBreakers
- Cavaughn Browne
- Rephael Edwards
 
#### SADCAN
- Aimee Phillips
- Andrew McKissick
- Benjamin Shelton

#### A cat named dog
- shujing zhang

### Zphr Gaming

- Waseem Azher
- Mrudula Kosaraju
- Anderson Nwammadi
