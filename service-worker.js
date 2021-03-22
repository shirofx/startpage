
// A license on a service worker looks kinda cringe, so... yea this is CC0 Public Domain
// Anyways, does LibreJS even block service workers?

// This is way nicer than the DOM2 crap wtf, interwebz SUCK
self.oninstall = function(e) {
	e.waitUntil(
		caches.open("startpage").then(function(cache) {
			return cache.addAll([
				"/index.html",
				"/css/clock.css",
				"/css/dialog.css",
				"/css/search.css",
				"/css/settings.css",
				"/css/style.css",
				"/img/1611446816300.webm",
				"/img/cute.png",
				"/js/builder.js",
				"/js/clock.js",
				"/js/config.js",
				"/js/dialog.js",
				"/js/search.js",
				"/js/settings.js"
			]);
		})
	);
};

self.onfetch = function(e) {
	e.respondsWith(
		caches.match(e.request).then(
			function(r) {
				if (r) return r;
				return fetch(event.request).then(
					function(r) {
						caches.open("startpage").then(function(cache) {
							cache.put(event.request, r.clone());
						});
						return r;
					}
				).catch(
					function() {
						return caches.match("/img/1611446816300.webm");
					}
				);
			}
		)
	);
}
