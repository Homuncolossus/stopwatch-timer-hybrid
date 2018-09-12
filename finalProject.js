// Set global boolean for debug:
let debug = false;
// Set array for millisecond operations in loops:
let msConv = [6000000, 600000, 60000, 10000, 1000, 100, 10];
// Initial clock setting is 0:
let clockValue = 0;
// Initial clock mode is stopwatch (true; timer is false):
let clockMode = true;
// Initial clock state is paused (true; counting up or down is false):
let clockPaused = true;
// Variable for interval ID for operating clock:
let timePassing;
// Variable for counting number of times changeClock function is called:
let changeClockCounter = 0;
// Variable for counting number of times clockMode function is called:
let clockModeCounter = 0;
// Variable for counting number of times setClock function is called:
let setClockCounter = 0;
// Variable for counting number of times control function is called:
let controlCounter = 0;

// Function triggers when clockMode button is clicked:
function changeClockMode() {
	let timerNotZero = document.getElementById("timerNotZero");
	// Clear message next to control button:
	while (timerNotZero.firstChild) {
		timerNotZero.removeChild(timerNotZero.firstChild);
	}
	// Set clock status to paused if not already:
	clockPaused = true;
	// Change control button to read "Start":
	document.getElementById("control").src = "images/Start.png";
	// Stop clock if not already:
	clearInterval(timePassing);
	if (clockMode) {
		// If in stopwatch mode:
		clockMode = false;
		// Change button to reflect timer mode:
		document.getElementById("clockMode").src = "images/Timer-Mode.png";
		// Make input for setting timer visible (along with instructions):
		document.getElementById("timer").style.display = "block";
		// Change button to Set Timer:
		document.getElementById("setClock").src = "images/Set-Timer.png";
		let timerInputValidationMessage = document.getElementById("timerInputValidationMessage");
		// Delete any previous validation messages:
		while (timerInputValidationMessage.firstChild) {
			timerInputValidationMessage.removeChild(timerInputValidationMessage.firstChild);
		}
		// Output instructions:
		timerInputValidationMessage.appendChild(document.createTextNode("Enter a time less than or equal to 10 minutes but greater than 0 in the form MM:SS:CC, where MM is minutes, SS is seconds, and CC is centiseconds."));
	} else {
		// If in timer mode:
		clockMode = true;
		// Change button to reflect stopwatch mode:
		document.getElementById("clockMode").src = "images/Stopwatch-Mode.png";
		// Hide input for setting timer (along with instructions/validation messages):
		document.getElementById("timer").style.display = "none";
		// Change button to Reset Stopwatch:
		document.getElementById("setClock").src = "images/Reset-Stopwatch.png";
	}
	if (debug) {
		// If in debug mode, output message indicating function was called:
		let debugOutput = document.getElementById("debugOutput");
		let p = document.createElement("div");
		debugOutput.appendChild(p);
		p.appendChild(document.createTextNode("Function changeClockMode has been called."));
	}
}

// Function to validate time input by user:
function validateTimer() {
	// Variable to hold user input:
	let timerInput = document.getElementById("timerInput").value;
	// Complex regular expression for validation that ensures time in format MM:SS:CC and 00:00:00 < input <= 10:00:00:
	let regex = /^10\:00\:00$|^0(?:[1-9]\:\d{2}\:\d{2}|(?:0\:(?:[1-5]\d\:\d{2}|(?:0(?:[1-9]\:\d{2}|(?:0\:(?:0[1-9]|[1-9]\d)))))))$/;
	let timerInputValidationMessage = document.getElementById("timerInputValidationMessage");
	// If there are any nodes present in the validation, delete them before outputting new validation results:
	while (timerInputValidationMessage.firstChild) {
		timerInputValidationMessage.removeChild(timerInputValidationMessage.firstChild);
	}
	// Create image without source:
	let img = document.createElement("img");
	// Put image into validation node:
	timerInputValidationMessage.appendChild(img);
	if (regex.test(timerInput)) {
		// If the user input is valid, make image source green check:
		img.src = "images/greencheck.jpg";
		// Call setClock:
		setClock();
	} else {
		// If the user input is not valid, make image source red X:
		img.src = "images/redx.png";
		// Output validation message:
		timerInputValidationMessage.appendChild(document.createTextNode(" Must be less than or equal to 10 minutes, but greater than 0, and in the form MM:SS:CC."));
	}
	if (debug) {
		// If in debug mode, output message indicating function was called:
		let debugOutput = document.getElementById("debugOutput");
		let p = document.createElement("div");
		debugOutput.appendChild(p);
		p.appendChild(document.createTextNode("Function validateTimer has been called."));
	}
}

// Function to set clock to user input if in timer mode, or reset clock to 00:00:00 if in stopwatch mode:
function setClock() {
	if (clockMode) {
		// In stopwatch mode, set clock value to 0:
		clockValue = 0;
		// Set clock images all to 0:
		for (w = 0; w < 3; w++) {
			for (v = 0; v < 2; v++) {
				document.getElementById("img" + (w * 2 + v)).src = "images/0.gif";
			}
		}
	} else {
		let timerInput = document.getElementById("timerInput").value;
		// In timer mode, set clock value to user input in milliseconds:
		clockValue = (timerInput[0] * msConv[1]) + (timerInput[1] * msConv[2]) + (timerInput[3] * msConv[3]) + (timerInput[4] * msConv[4]) + (timerInput[6] * msConv[5]) + (timerInput[7] * msConv[6]);
		// Set images to match user input:
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 2; j++) {
				document.getElementById("img" + (i * 2 + j)).src = "images/" + timerInput[i * 3 + j] + ".gif";
			}
		}
	}
	if (debug) {
		// If in debug mode, output message indicating function was called:
		let debugOutput = document.getElementById("debugOutput");
		let p = document.createElement("div");
		debugOutput.appendChild(p);
		p.appendChild(document.createTextNode("Function setClock has been called."));
	}
}

// Function to start or pause the clock:
function startPause() {
	let timerNotZero = document.getElementById("timerNotZero");
	// Clear message next to control button:
	while (timerNotZero.firstChild) {
		timerNotZero.removeChild(timerNotZero.firstChild);
	}
	if (clockPaused) {
		if (!clockMode && (clockValue == 0 || clockValue > 600000)) {
			// If user tries to start timer when 0 or greater than 10 minutes, output message indicating timer must be set:
			timerNotZero.appendChild(document.createTextNode("You must first set the timer."));
		} else {
			// Change clock status to active:
			clockPaused = false;
			// Change button appearance to pause option:
			document.getElementById("control").src = "images/Pause.png";
			// Call changeClock every centisecond:
			timePassing = setInterval(changeClock,10);
			let unfocus = document.getElementById("unfocus");
			while (unfocus.firstChild) {
				unfocus.removeChild(unfocus.firstChild);
			}
		}
	} else {
		// Change clock status to inactive:
		clockPaused = true;
		// Change button appearance to start option:
		document.getElementById("control").src = "images/Start.png";
		// Stop clock:
		clearInterval(timePassing);
	}
	if (debug) {
		// If in debug mode, output message indicating function was called:
		let debugOutput = document.getElementById("debugOutput");
		let p = document.createElement("div");
		debugOutput.appendChild(p);
		p.appendChild(document.createTextNode("Function startPause has been called."));
	}
}

// Function to operate clock:
function changeClock() {
	if ((clockValue == 0 && !clockMode) || (clockValue == 5999990 && clockMode)) {
		// If at max and try to increase, or at min and try to decrease, stop interval:
		clearInterval(timePassing);
		// Set to paused:
		clockPaused = true;
		// Change button to start option:
		document.getElementById("control").src = "images/Start.png";
		setTimeout(function() {
			if (clockValue == 0) {
				// If at 0, tell user timer is done:
				alert("Your timer is finished!");
			} else {
				// If at max time, tell user maximum reached:
				alert("Maximum time reached.");
			}
		},10);
	} else if (clockMode) {
		// If in stopwatch mode, increase time:
		clockValue += 10;
	} else {
		// If in timer mode, decrease time:
		clockValue -=10;
	}
	// Change clock images to reflect time change:
	for (k = 0; k < 3; k++) {
		for (n = 0; n < 2; n++) {
			document.getElementById("img" + (k * 2 + n)).src = "images/" + Math.floor((clockValue % msConv[k * 2 + n]) / msConv[k * 2 + n + 1]) + ".gif";
		}
	}
	if (debug) {
		// Increment counter to reflect number of times this function has been called:
		changeClockCounter++;
		let changeClockCount = document.getElementById("changeClockCount");
		// Output count:
		changeClockCount.removeChild(changeClockCount.lastChild);
		changeClockCount.appendChild(document.createTextNode(changeClockCounter));
	}
}

function debugSwitch() {
	// Coolect nodes into variables:
	let changeClockCount = document.getElementById("changeClockCount");
	let clockModeCount = document.getElementById("clockModeCount");
	let setClockCount = document.getElementById("setClockCount");
	let controlCount = document.getElementById("controlCount");
	let debugOutput = document.getElementById("debugOutput");
	if (debug) {
		// Debug off:
		debug = false;
		// Change button to turn on option:
		document.getElementById("debugSwitch").src = "images/Turn-Debug-On.png";
		// Reset function counters to 0:
		changeClockCounter = 0;
		clockModeCounter = 0;
		setClockCounter = 0;
		controlCounter = 0;
		// Remove debug output:
		while (changeClockCount.firstChild) {
			changeClockCount.removeChild(changeClockCount.firstChild);
		}
		while (clockModeCount.firstChild) {
			clockModeCount.removeChild(clockModeCount.firstChild);
		}
		while (setClockCount.firstChild) {
			setClockCount.removeChild(setClockCount.firstChild);
		}
		while (controlCount.firstChild) {
			controlCount.removeChild(controlCount.firstChild);
		}
		while (debugOutput.firstChild) {
			debugOutput.removeChild(debugOutput.firstChild);
		}
	} else {
		// Debug on:
		debug = true;
		// Change button to turn off option:
		document.getElementById("debugSwitch").src = "images/Turn-Debug-Off.png";
		// Counter output:
		changeClockCount.appendChild(document.createTextNode("Number of times the changeClock function has been called: "));
		changeClockCount.appendChild(document.createTextNode(changeClockCounter));
		clockModeCount.appendChild(document.createTextNode("Number of times the clockMode button has been clicked: "));
		clockModeCount.appendChild(document.createTextNode(clockModeCounter));
		setClockCount.appendChild(document.createTextNode("Number of times the setClock button has been clicked: "));
		setClockCount.appendChild(document.createTextNode(setClockCounter));
		controlCount.appendChild(document.createTextNode("Number of times the control button has been clicked: "));
		controlCount.appendChild(document.createTextNode(controlCounter));
		// If in debug mode, output message indicating function was called:
		let p = document.createElement("div");
		debugOutput.appendChild(p);
		p.appendChild(document.createTextNode("Function debugSwitch has been called."));
	}
}

window.onload = function() { 

	document.getElementById("clockMode").onclick = function(evt) {
		changeClockMode();
		if (debug) {
			// Increment function counter:
			clockModeCounter++;
			// Output counter:
			clockModeCount.removeChild(clockModeCount.lastChild);
			clockModeCount.appendChild(document.createTextNode(clockModeCounter));
		}
	}
	
	document.getElementById("setClock").onclick = function(evt) {
		if (clockMode) {
			// If in stopwatch mode, simpy call setClock:
			setClock();
		} else {
			// If in timer mode, must call validateTimer prior to setClock:
			validateTimer();
		}
		if (debug) {
			// Increment function counter:
			setClockCounter++;
			// Output counter:
			setClockCount.removeChild(setClockCount.lastChild);
			setClockCount.appendChild(document.createTextNode(setClockCounter));
		}
	}

	document.getElementById("control").onclick = function(evt) {
		startPause();
		if (debug) {
			// Increment function counter:
			controlCounter++;
			// Output counter:
			controlCount.removeChild(controlCount.lastChild);
			controlCount.appendChild(document.createTextNode(controlCounter));
		}
	}
	
	document.getElementById("debugSwitch").onclick = function(evt) {
		debugSwitch();
	}
	
	// To stop clock when tab 
	document.addEventListener("visibilitychange", function() {
		if (!clockPaused) {
			// Change clock status to inactive:
			clockPaused = true;
			// Change button appearance to start option:
			document.getElementById("control").src = "images/Start.png";
			// Stop clock:
			clearInterval(timePassing);
			let unfocus = document.getElementById("unfocus");
			unfocus.appendChild(document.createTextNode("The clock can only count in 1 second increments when the tab is not the active tab. As a result, the clock has been stopped. Please click \"Start\" to resume the clock."));
		}
	});
}