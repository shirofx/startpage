
/**
 *
 * @source: https://startpage.gnu.cat/js/config.js
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

class Config {

	get structure() {
		return JSON.parse(localStorage.getItem("structure"));
	}
	set structure(structure) {
		localStorage.structure = JSON.stringify(structure);
	}

	get settings() {
		return JSON.parse(localStorage.getItem("settings"));
	}
	set settings(settings) {
		localStorage.settings = JSON.stringify(settings);
	}

	constructor() {
		this.structure = this.structure || {
			"Zerk Off Zone": [
				["4chan Random", "https://boards.4chan.org/b/"],
				["Start Pages", "https://www.reddit.com/r/startpages/"],
				["Aww", "https://www.reddit.com/r/aww/"],
				["Steam", "steam://"]
			],
			"Social": [
				["YouTube", "https://www.youtube.com/"],
				["Racó Català", "https://www.racocatala.cat/forums"],
				["Twitter", "https://twitter.com/home"],
				["Reddit", "https://www.reddit.com/"],
				["Twitch", "https://www.twitch.tv/"]
			],
			"SITREP": [
				["Zoho Mail", "https://mail.zoho.eu/zm/#mail/folder/inbox"],
				["GMail", "https://mail.google.com/mail/u/0/#inbox"],
				["Hotmail", "https://outlook.live.com/mail/0/inbox"],
				["Guerrilla", "https://www.guerrillamail.com/"]
			],
			"Feels": [
				["/WSG/", "https://boards.4channel.org/wsg/"],
				["GNUCAT", "https://gnu.cat/"],
				["Capuno", "https://capuno.cat/"]
			],
			"News": [
				["FT", "https://www.ft.com/"],
				["El Punt Avui", "https://www.elpuntavui.cat/barcelona.html"]
			]
		};
		this.settings = this.settings || {
			"clock": {
				"effect": "fade"
			},
			"palette": {
				"background": "#1C1C1C",
				"foreground": "#3C3C3C",
				"accent": "pink"
			},
			"cute": false
		}
	}

}

var cfg = new Config();
