
/**
 *
 * @source: https://startpage.gnu.cat/js/search.js
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

var search_input = document.getElementById("search_input");

document.onkeydown = function(e) {

	if (e.target.type!="text") {
		let data = search_input.value;
		search_input.value = "";
		search_input.focus();
		search_input.value = data;
	}

}

search_input.onkeyup = function() {
	if (this.value) this.parentElement.classList.add("visible");
	else this.parentElement.classList.remove("visible");
}
