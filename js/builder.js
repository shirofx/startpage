
/**
 *
 * @source: https://startpage.gnu.cat/js/builder.js
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

if ("serviceWorker" in navigator)
	navigator.serviceWorker.register("/service-worker.js").catch(
		function() {
			console.log("Service Worker not loaded.");
		}
	);

// navigator.serviceWorker.getRegistration().then(function(reg) {reg.unregister()});

var structure = cfg.structure;

var main = document.getElementsByTagName("main")[0];

function createDaddy() {
	if (arguments.length==0) {
		var dialog = new Dialog();
		dialog.addInput("Title", "title");
		dialog.onsubmit = function(data) {
			var daddy = createDaddy(data.title);
			main.appendChild(daddy);
			structure[data.title] = [];
			cfg.structure = structure;
		};
		dialog.show();
	} else {
		var daddy = document.createElement("section");
		daddy.title = arguments[0];
		// this is so duuuuumb come oonnn capunoooooo aaaaaaaaaaaaAAAAAAAAAAHHHH
		daddy.innerHTML = `
			<span class="actions">
				<button onclick="this.parentElement.parentElement.delete()">✖</button>
				<button onclick="this.parentElement.parentElement.insert()">✚</button>
			</span>
		`;

		daddy.insert = function() {
			var dialog = new Dialog();
			dialog.addInput("Title", "title");
			dialog.addInput("URL", "url");
			var daddy = this; // milions of years of evolution for this
			dialog.onsubmit = function(data) {
				createKiddy(daddy, data.title, data.url);

				structure[daddy.title].push([data.title, data.url]);
				cfg.structure = structure;
			};
			dialog.show();
		}
		daddy.delete = function() {
			delete structure[this.title];
			cfg.structure = structure;
			this.remove();
		}

		daddy.ondragover = function(e) {
			e.preventDefault()
		};
		daddy.ondragenter = function(e) {
			this.classList.add("open");
		};
		daddy.ondragleave = function(e) {
			this.classList.remove("open");
		};
		daddy.ondrop = function(e) {
			e.preventDefault();
			this.ondragleave();
			var element = document.getElementById("flying");
			element.ondragstop();
			this.appendChild(element);
			element.setAttribute("data-position", structure[this.title].length);
			structure[this.title].push([element.innerHTML, element.href]);
			cfg.structure = structure;
		};
	}
	return daddy;
}
function createKiddy(daddy, title, url) {
	var kiddy = document.createElement("a");
	kiddy.draggable = true; // this is so dumb
	kiddy.innerHTML = title;
	kiddy.href = url;
	kiddy.setAttribute("data-position", position);

	kiddy.delete = function() {
		this.ondragstart();
		main.id = "";
		cfg.structure = structure;
		this.remove();
	}

	kiddy.ondragstart = function(e) {
		this.id = "flying"; main.id = "disabled";
		var index = this.getAttribute("data-position");
		structure[this.parentElement.title].splice(index, 1);
		var domino = this;
		while (domino=domino.nextElementSibling) {
			domino.setAttribute("data-position", index++);
		}
	};
	kiddy.ondragstop = function(e) {
		this.id = main.id = "";
	};

	daddy.appendChild(kiddy);
}

// Everythin you will see inside this for loop may or may not cause
// severe anxiety. Viewer discretion is advised.
for (var category in structure) {

	var daddy = createDaddy(category);

	var links = structure[category];
	for (var position in links) {
		link = links[position];
		createKiddy(daddy, link[0], link[1]);
	}

	main.appendChild(daddy);

}

// Is this instead of hook html attributes dirtier? i cant make my mind up about it
var bin = document.getElementById("bin");
bin.ondragenter = function(e) {
	this.classList.add("open");
};
bin.ondragleave = function(e) {
	this.classList.remove("open");
};
bin.ondragover = function(e) {
	e.preventDefault();
}
bin.ondrop = function(e) {
	e.preventDefault();
	this.ondragleave();
	document.getElementById("flying").remove();
	cfg.structure = structure;
	main.id = "";
}

document.getElementById("cog").onclick = function() {
	document.body.id = document.body.id=="edit"?"":"edit";
}

document.onmouseup = document.onmouseleave = function() {
	var a = document.getElementById("flying");
	if (a) {
		var index = a.getAttribute("data-position");
		structure[a.parentElement.title].splice(index, 0, [a.innerHTML, a.href]);
		main.id = a.id = "";
		while (a=a.nextElementSibling) {
			a.setAttribute("data-position", ++index);
		}
	}
}
