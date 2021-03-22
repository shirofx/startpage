
/**
 *
 * @source: https://startpage.gnu.cat/js/dialog.js
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


class Dialog {

	set onsubmit(func) {
		var dialog = this;
		this.form.onsubmit = function() {
			var data = {};
			for (var i = 0; i < dialog.names.length; i++) {
				data[dialog.names[i]] = document.getElementsByName(dialog.names[i])[0].value;
			}
			func(data);
			dialog.sudoku();
			return false;
		};
	}

	constructor() {
		this.form = document.createElement("form");
		this.form.id = "dialog";
		this.names = [];
		this.form.innerHTML = "";
	}

	addInput(title, name, type="text") {
		this.names.push(name);
		var label = document.createElement("label");
		label.innerHTML = `${title}<br><input type="${type}" name="${name}" placeholder="${title}">`;
		this.form.appendChild(label);
	}

	show() {
		var submit = document.createElement("input");
		submit.type = "submit";
		submit.value = "Save";
		var cancel = document.createElement("button");
		cancel.innerHTML = "Cancel";
		cancel.onclick = this.sudoku;
		this.form.appendChild(submit);
		this.form.appendChild(cancel);
		document.body.appendChild(this.form);
	}

	sudoku() {
		this.form.remove();
		delete this;
	}

}
