## Adding Enemies

The finished code is available [here](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/Program_1_Starter)

### We need an emeny image, so lets preload it

```js
game.load.image('enemy', 'assets/enemy.png');
```

### Enemy Group

We will be dealing with a decent number of "enemies" so it's a good idea to deal with them as a "group".
- You can create all the enemies in advance
- All of them start off as "dead"
- When we need to add one to the game we just choose from the group
- When the enemy "dies" it goes back in the group

#### Initialize the group
```js
// Create an enemy group with Arcade physics
this.enemies = game.add.group();
this.enemies.enableBody = true;
// Create 10 enemies in the group with the 'enemy' image
// Enemies are "dead" by default so they are not visible in the game
this.enemies.createMultiple(10, 'enemy');
```

### Timer Event

We want to add an enemy to the game every couple of seconds (maybe we can scale that as the game goes on) so we use `game.time.events.loop`.

- `game.time.events.loop(delay, callback, context)`
    - delay: the delay in ms between each callback.
    - callback: the function that will be called.
    - context: the context in which to run the callback, most of the time it will be this.

#### Actually adding the timer:
```js
// Call 'addEnemy' every 2.2 seconds
game.time.events.loop(2200, this.addEnemy, this);
```

### Enemy Function

```js
addEnemy: function() {
  // Get the first dead enemy of the group
  var enemy = this.enemies.getFirstDead();
  // If there isn't any dead enemy, do nothing
  if (!enemy) {
      return;
  }
  // Initialize the enemy
  
  // Set the anchor point centered at the bottom
  enemy.anchor.setTo(0.5, 1);
  
  // Put the enemy above the top hole
  enemy.reset(game.width/2, 0);
  
  // Add gravity to see it fall
  enemy.body.gravity.y = 500;
  
  //Randomly choose to move left or right when dropped into the game
  enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
  
  //Turning on bounce makes the enemies change direction when they hit a wall
  enemy.body.bounce.x = 1;
  
  //Kill the sprite when it's no longer in the world
  enemy.checkWorldBounds = true;
  enemy.outOfBoundsKill = true;
}
```

### Collisions

We want two things to happen:
- Enemies to move along the walls
- Player to die when touched by an enemy

#### In the update function
```js
// Make the enemies and walls collide
game.physics.arcade.collide(this.enemies, this.walls);

// Call the 'playerDie' function when the player and an enemy overlap
game.physics.arcade.overlap(this.player, this.enemies, this.playerDie,
null, this);
```

### Addtional Info on Groups

```js
// A group can act like a giant sprite
// So it has the same properties you can edit
group.x;
group.y;
group.alpha;
group.angle;
// Return the number of dead/alive sprites in a group
group.countDead();
group.countLiving();
// Add an object to a group. It can be a sprite, a label, etc.
group.add(object);
```
