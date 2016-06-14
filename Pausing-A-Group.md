## Pausing Group

My solution may not be the "best", but since were all new to phaser I'm sure it's good enough for now.

First thing I did was add a `global` variable to our game file called `freeze` and set it to false.

***`game.js`***
```
game.global = {
    score: 0,
    freeze: 0
};
```

Then I needed the actual code to "freeze" then "unfreeze" the enemies. To freeze them I went with:
***`game.js`*** (playerDie)
```js
this.enemies.setAll('body.velocity.x',0);
```

That turns the velocity off for everyone in the `enemies` group.

I also set my global freeze var to true:
***`game.js`*** (playerDie)
```js
game.global.freeze = true;
```

At this point everyone is frozen (or are they)? The enemies not currently in the world are not effected, so they can still be added to the game. I fixed this by putting the following int the `addEnemy` function:
***`game.js`*** (addEnemy)
```js
if(game.global.freeze){
    return;
}
```

Ok, now all enemies are frozen, and no more will be added. But we have to get them started again. Let's use a timer:
***`game.js`*** (playerDie)
```js
game.time.events.add(Phaser.Timer.SECOND * 4, this.unfreezeGame, this);
```

This calls an `unfreezeGame` function:
***`game.js`*** (new function)
```js
unfreezeGame: function(){
    game.global.freeze = false;
    this.enemies.setAll('body.velocity.x',150);
},
```

