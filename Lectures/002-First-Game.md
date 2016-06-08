## Game Intro

Using the first phaser example as a template

### Background Color

```js
game.stage.backgroundColor = '#3498db';
```

### Physics Engine
One of the great features of Phaser is that it has 3 physics engines included. A physics
engine will manage the collisions and movements of all the objects in the game.
The 3 engines available are:
• P2. It’s a full featured physics system for games with complex collisions, like
Angry Birds.
• Ninja. It’s less powerful than P2, but still has some interesting features to handle
tilemaps and slopes.
• Arcade. It’s a system that only deals with rectangle collisions (called AABB), but
it also has the best performance.
