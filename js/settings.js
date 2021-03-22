
/**
 *
 * @source: https://startpage.gnu.cat/js/settings.js
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

var settings = cfg.settings;

document.getElementById("clockfx_"+settings.clock.effect).checked = true;

var actions = {
	"clock": {
		setEffect: function(fx) {
			settings.clock.effect = fx;
			cfg.settings = settings;
			let clock = document.getElementById("clock");
			switch (fx) {
				case "metal":
					clock.className = "metal";
					break;
				case "fade":
					clock.className = "fade";
					break;
				default:
					clock.className = "";
			}
		}
	},
	"palette": {
		setColor: function(setting, color) {
			settings.palette[setting] = color;
			cfg.settings = settings;
			let bro = document.getElementById("palette_"+setting);
			document.documentElement.style.setProperty(`--${setting}-color`, color);
			bro.style.backgroundColor = color;
		}
	},
	cute: function(con) {
		settings.cute = con;
		cfg.settings = settings;
		document.getElementById("cute").style.display = con ? "block" : "none";
	},
	export: function(key) {
		let data;
		if (key=="all") data = JSON.stringify({"structure": cfg.structure,"settings": cfg.settings}, null, 2);
		else {
			let tmp = {};
			tmp[key] = cfg[key];
			data = JSON.stringify(tmp, null, 2);
		}
		let a = document.createElement("a");
		a.href = "data:text/plain,"+encodeURIComponent(data);
		a.download = key+"-gnucat.json";
		a.click();
	},
	import: function(data) {
		// I don't even care if ur wrong omgzzzz
		if (data.files[0]) {
			let read = new FileReader();
			read.onload = function() {
				data = JSON.parse(read.result);
				if (data.settings) {
					cfg.settings = data.settings;
					settings = cfg.settings;
				}
				if (data.structure) {
					cfg.structure = data.structure;
					// Like you were gonna expect me to do this the right way hahahahah
					location.reload();
				}
				update();
			}
			read.readAsText(data.files[0]);
		}
	},
	reset: function() {
		localStorage.removeItem("structure");
		localStorage.removeItem("settings");
		location.reload();
	}
}

function update() {
	actions.clock.setEffect(settings.clock.effect);
	actions.palette.setColor("background", settings.palette.background);
	actions.palette.setColor("foreground", settings.palette.foreground);
	actions.palette.setColor("accent", settings.palette.accent);
	actions.cute(settings.cute);
}

update();
