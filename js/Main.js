var canvas, canvasContext;
const FRAMES_PER_SECOND = 60;
const TIME_PER_TICK = 1/FRAMES_PER_SECOND;

const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 38;
const KEY_ARROW_RIGHT = 39;
const KEY_ARROW_DOWN = 40;

const KEY_NUMPAD_0 = 96;
const KEY_NUMPAD_9 = 105;
const KEY_NUMPAD_PLUS = 107;
const KEY_NUMPAD_MINUS = 109;
const KEY_NUMPAD_PERIOD = 110;

const KEY_BACKSPACE = 8
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_SPACEBAR = 32;

const KEY_0 = 48;
const KEY_9 = 57;
const KEY_PLUS = 187;
const KEY_MINUS = 189;
const KEY_PERIOD = 190;
const KEY_TILDE = 192; // cheat console

var mouseX;
var mouseY;
var mouseButtonHeld = false;
var confirmKeyHeld = false;
var jumpKeyHeld = false;
var leftKeyHeld = false;
var upKeyHeld = false;
var rightKeyHeld = false;
var downKeyHeld = false;
var jumpButtonPower = .1;
var jumpButtonHoldAvailable = false;

var backgroundColor = 'dimGrey';

var _GRAVITY = 0.20;
var _AIR_RESISTANCE = 0.90;
var _FRICTION = 0.92;

var heroX;
var heroY;
var heroSpeed = 0.05;
var heroAngle = 0;
var heroWidth = 32;
var heroHeight = 32;
var heroVelocityX = 0;
var heroVelocityY = 0;
var heroMaxVelocityX = 20;
var heroMaxVelocityY = 10;
var heroMoveSpeed = 1;
var heroJumpSpeed = 10;
var heroColor = 'lightGray';

var angleChangeRate = 0.01 * Math.PI;
var laserPower = 1;

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	document.addEventListener('mousemove', mousePosHandler);
	document.addEventListener('mousedown', mousePressed);
	document.addEventListener('mouseup', mouseReleased);

	heroX = canvas.width/2;
	heroY = canvas.height/2;

	setInterval(function()
	{
		update();
		draw();
	}, 1000/FRAMES_PER_SECOND);
}

function update()
{
	if(jumpKeyHeld)
	{
		heroVelocityX -= Math.cos(heroAngle) * heroSpeed;
		heroVelocityY -= Math.sin(heroAngle) * heroSpeed;
		laserPower += 0.1;
	}
	else
	{
		heroAngle += angleChangeRate;
		laserPower = 1;
	}

	if (heroVelocityX > 2)
	{
		heroVelocityX = 2;
	}

	if (heroVelocityY > 2)
	{
		heroVelocityY = 2;
	}

	heroX += heroVelocityX;
	heroY += heroVelocityY;

	panelUpdate(debugPanel);
}

function draw()
{
	colorRect(0, 0, canvas.width, canvas.height, backgroundColor);
	drawPanelWithButtons(debugPanel, PRECISION);
	colorRect(heroX-heroWidth/2, heroY-heroHeight/2, heroWidth, heroHeight, heroColor);

	var x = Math.cos(heroAngle);
	var y = Math.sin(heroAngle);

	context.strokeStyle = 'yellow';
	context.beginPath();
	context.moveTo(heroX, heroY);
	context.lineTo(heroX+x*100, heroY+y*100);
	context.lineWidth = laserPower;
	context.stroke();
}

function keyPressed(evt)
{
	keyEventHandler(evt.keyCode, true);
	panelKeyCapture(debugPanel, evt);
}

function keyReleased(evt)
{
	keyEventHandler(evt.keyCode, false);
}

function keyEventHandler(key, state)
{
	switch (key)
	{
		case KEY_SPACEBAR:
			jumpKeyHeld = state;
			break;
		case KEY_ENTER:
			confirmKeyHeld = state;
			break;
		case KEY_ARROW_LEFT:
			leftKeyHeld = state;
			break;
		case KEY_ARROW_UP:
			upKeyHeld = state;
			break;
		case KEY_ARROW_RIGHT:
			rightKeyHeld = state;
			break;
		case KEY_ARROW_DOWN:
			downKeyHeld = state;
			break;
		default:
			break;
	}
}

function mousePosHandler(evt)
{
	var mousePos = calculateMousePos(evt);
	mouseX = mousePos.x;
	mouseY = mousePos.y;
}

function mousePressed(evt)
{
	mouseButtonHeld = true;
}

function mouseReleased(evt)
{
	mouseButtonHeld = false;
}

function calculateMousePos(evt)
{
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
	x: mouseX,
	y: mouseY
  };
}
//
// function calculateAngleFrom(this, that)
// {
// 	x1 = that.x;
// 	x2 = this.x;
// 	y1 = that.y;
// 	y2 = this.y;
//
// 	return Math.atan2(y2 - y1, x2 - x1);
// }
