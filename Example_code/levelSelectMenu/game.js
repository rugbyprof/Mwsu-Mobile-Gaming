var game = new Phaser.Game(320, 480, Phaser.AUTO, "", {preload: onPreload, create: onCreate});

// number of thumbnail rows
var thumbRows = 5;
// number of thumbnail cololumns
var thumbCols = 4;
// width of a thumbnail, in pixels
var thumbWidth = 64;
// height of a thumbnail, in pixels
var thumbHeight = 64;
// space among thumbnails, in pixels
var thumbSpacing = 8;
// array with finished levels and stars collected.
// 0 = playable yet unfinished level
// 1, 2, 3 = level finished with 1, 2, 3 stars
// 4 = locked
var starsArray = [1,2,1,2,3,3,3,2,2,1,3,1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
// how many pages are needed to show all levels?
// CAUTION!! EACH PAGE SHOULD HAVE THE SAME AMOUNT OF LEVELS, THAT IS
// THE NUMBER OF LEVELS *MUST* BE DIVISIBLE BY THUMBCOLS*THUMBROWS
var pages = starsArray.length/(thumbRows*thumbCols);
// group where to place all level thumbnails
var levelThumbsGroup;
// current page
var currentPage = 0;
// arrows to navigate through level pages
var leftArrow;
var rightArrow;

// preloading graphic assets
function onPreload() {
	game.load.spritesheet("levels", "levels.png", 64, 64);
	game.load.spritesheet("level_arrows", "level_arrows.png", 48, 48);
}

// going fullscreen
function goFullScreen(){
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize(true);
}

function onCreate() {
	goFullScreen();
	// placing left and right arrow buttons, will call arrowClicked function when clicked
	leftArrow = game.add.button(50,420,"level_arrows",arrowClicked);
	leftArrow.anchor.setTo(0.5);
	leftArrow.frame = 0;
	leftArrow.alpha = 0.3;
	rightArrow = game.add.button(270,420,"level_arrows",arrowClicked);
	rightArrow.anchor.setTo(0.5);
	rightArrow.frame = 1;
	// creation of the thumbails group
	levelThumbsGroup = game.add.group();
	// determining level thumbnails width and height for each page
	var levelLength = thumbWidth*thumbCols+thumbSpacing*(thumbCols-1);
	var levelHeight = thumbWidth*thumbRows+thumbSpacing*(thumbRows-1);
	// looping through each page
	for(var l = 0; l < pages; l++){
		// horizontal offset to have level thumbnails horizontally centered in the page
		var offsetX = (game.width-levelLength)/2+game.width*l;
		// I am not interested in having level thumbnails vertically centered in the page, but
		// if you are, simple replace my "20" with
		// (game.height-levelHeight)/2
		var offsetY = 20;
		// looping through each level thumbnails
	     for(var i = 0; i < thumbRows; i ++){
	     	for(var j = 0; j < thumbCols; j ++){  
	     		// which level does the thumbnail refer?
				var levelNumber = i*thumbCols+j+l*(thumbRows*thumbCols);
				// adding the thumbnail, as a button which will call thumbClicked function if clicked   		
				var levelThumb = game.add.button(offsetX+j*(thumbWidth+thumbSpacing), offsetY+i*(thumbHeight+thumbSpacing), "levels", thumbClicked, this);	
				// shwoing proper frame
				levelThumb.frame=starsArray[levelNumber];
				// custom attribute 
				levelThumb.levelNumber = levelNumber+1;
				// adding the level thumb to the group
				levelThumbsGroup.add(levelThumb);
				// if the level is playable, also write level number
				if(starsArray[levelNumber]<4){
					var style = {
						font: "18px Arial",
						fill: "#ffffff"
					};
					var levelText = game.add.text(levelThumb.x+5,levelThumb.y+5,levelNumber+1,style);
					levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
					levelThumbsGroup.add(levelText);
				}
			}
		}
	}
}

function thumbClicked(button){
	// the level is playable, then play the level!!
	if(button.frame < 4){
		alert("playing level " + button.levelNumber);
	}
	// else, let's shake the locked levels
	else{
		var buttonTween = game.add.tween(button)
		buttonTween.to({
			x: button.x+thumbWidth/15
		}, 20, Phaser.Easing.Cubic.None);
		buttonTween.to({
			x: button.x-thumbWidth/15
		}, 20, Phaser.Easing.Cubic.None);
		buttonTween.to({
			x: button.x+thumbWidth/15
		}, 20, Phaser.Easing.Cubic.None);
		buttonTween.to({
			x: button.x-thumbWidth/15
		}, 20, Phaser.Easing.Cubic.None);
		buttonTween.to({
			x: button.x
		}, 20, Phaser.Easing.Cubic.None);
		buttonTween.start();
	}
}


function arrowClicked(button){
	// touching right arrow and still not reached last page
	if(button.frame==1 && currentPage<pages-1){
		leftArrow.alpha = 1;
		currentPage++;
		// fade out the button if we reached last page
		if(currentPage == pages-1){
			button.alpha = 0.3;
		}
		// scrolling level pages
		var buttonsTween = game.add.tween(levelThumbsGroup);
		buttonsTween.to({
			x: currentPage * game.width * -1
		}, 500, Phaser.Easing.Cubic.None);
		buttonsTween.start();
	}
	// touching left arrow and still not reached first page
	if(button.frame==0 && currentPage>0){
		rightArrow.alpha = 1;
		currentPage--;
		// fade out the button if we reached first page
		if(currentPage == 0){
			button.alpha = 0.3;
		}
		// scrolling level pages
		var buttonsTween = game.add.tween(levelThumbsGroup);
		buttonsTween.to({
			x: currentPage * game.width * -1
		}, 400, Phaser.Easing.Cubic.None);
		buttonsTween.start();
	}		
}