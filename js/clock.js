
/**
 *
 * @source: https://startpage.gnu.cat/js/clock.js
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2021  Jaume Fuster i Claris
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

// I could do this from the server to truly be a fully CSS clock but no

function calibrate() {
	var start = new Date();
	var seconds = [start.getSeconds()/10, start.getSeconds()%10];
	var clock = document.getElementById("clock");
	for (var i = 0; i < clock.children.length; i++) {
		var digits = clock.children[i].children;
		digits[0].style.animation = "none";
		digits[1].style.animation = "none";
	}
	var timer = start.getHours()*3600 + start.getMinutes()*60 + start.getSeconds();

	// Please don't look at this part of the code
	//timer = 86390;
	setTimeout(function() {location.reload()}, (86400-timer)*1000);
	// OK you can continue looking

	setTimeout(function() {
		// I...
		let offset = [[-12, -3], [-8, -4], [0, 0]];
		for (var i = 0; i < clock.children.length; i++) {
			var digits = clock.children[i].children;
			digits[0].style.animation = digits[1].style.animation = "";
			digits[0].style.animationDelay = `-${timer+offset[i][0]}s`;
			digits[1].style.animationDelay = `-${timer+offset[i][1]}s`;
		}
	}, 1);
}

calibrate();
