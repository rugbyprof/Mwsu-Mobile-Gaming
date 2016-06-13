## Improvements

Let's add:
- best score,
- a mute button
- increasing difficulty

### Best Score

One great feature of HTML5 is called “local storage”, it lets us store some information on a persons computer. This is really useful but also limited. Remember, javascript has to be secure, so we really don't have access to the local file system, just a place to store "some" data (like a high score, the player’s progress, or some settings).

Local storage uses two functions:
- `localStorage.getItem('name') that returns the value stored for ‘name’`
- `localStorage.setItem('name', value) that stores ‘value’ in ‘name’`

***`menu.js`*** (create)
```js
// If 'bestScore' is not defined
// It means that this is the first time the game is played
if (!localStorage.getItem('bestScore')) {
    // Then set the best score to 0
    localStorage.setItem('bestScore', 0);
}
// If the score is higher than the best score
if (game.global.score > localStorage.getItem('bestScore')) {
    // Then update the best score
    localStorage.setItem('bestScore', game.global.score);
}
```

### Display Best Score

![](http://f.cl.ly/items/2q471o1y2x2l3F0X0Y39/Screen%20Shot%202016-06-13%20at%209.37.44%20AM.png)

Displaying the score is even easier, we just have to use `localStorage.getItem`.

So far we used this to display the score in the menu.js file:

```js
var scoreLabel = game.add.text(game.width/2, game.height/2,'score: ' + game.global.score,{ font: '25px Arial', fill: '#ffffff' });
```

All we have to do is to edit it like this:
```js
var text = 'score: ' + game.global.score + '\nbest score: ' + localStorage.getItem('bestScore');
var scoreLabel = game.add.text(game.width/2, game.height/2, text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
```

- The `\n` will add a line break. And since the label is now on 2 lines, we added align: `center` to center everything.
- Just make sure to put this code after storing the best score, so that `localStorage.getItem` retrieves the newest best score.

### Mute Button




![](http://f.cl.ly/items/1W2j052U3B3z1G2R1D1u/Screen%20Shot%202016-06-13%20at%209.31.43%20AM.png)

![](http://f.cl.ly/items/383q283K0m3s0t3W0f3W/Screen%20Shot%202016-06-13%20at%209.32.36%20AM.png)

<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
