/*global APP:false */
'use strict';

APP.data = (function () {
	var API_BASE_URL = 'http://api.metro.net/agencies/lametro/';

	return {
		init: function () {
			// This is a total hack... let the main module know we're loaded and ready
			$(function () { APP.home.init() });
		},

		getDirectionName: function (route, runSuffix, callback) {
			var url = API_BASE_URL + 'routes/' + route + '/runs/';

			$.get(url, function (data) {
				var done = false;

				_.each(data.items, function (item) {
					// Hack to stop if we found it already
					if (done) { return; }

					var runId = item.route_id,
						routeToken = runId.substring(0, runId.indexOf('_')),
						runSuffixToken = runId.substr(runId.length - 1);

					if (routeToken == route && runSuffix == runSuffixToken) {
						var displayName = item.display_name,
							name = displayName.split(' ').slice(2).join(' ');

						callback(name);
						done = true;
					}
				});
			});
		},

		getStopName: function (stop, callback) {
			var url = API_BASE_URL + 'stops/' + stop + '/';

			$.get(url, function (data) {
				callback(data.display_name);
			});
		},

		// Gets predictions for an array of stops
		getPredictions: function (stops, callback) {
			var deferreds = [],
				predictions = {},
				predictionsGrouped = {};

			// Get predictions for each stop and store in predictions
			_.each(stops, function (stop) {
				var url = API_BASE_URL + 'stops/' + stop + '/predictions/',
					deferred = $.get(url, function (data) {
							predictions[stop] = data.items;
						});

				deferreds.push(deferred);
			});


			// At the end, call callback
			$.when.apply($, deferreds).done(function ()
			{
				// Loop over stops in predictions object and group them
				_.each(predictions, function (data, stop) {
					var grouped = APP.data.parsePredictions(data);

					// Add to grouped object
					predictionsGrouped[stop] = grouped;
				});

				callback(predictionsGrouped);
			});
		},

		// Takes an array of predictions and groups by route and direction (run suffix)
		parsePredictions: function (data) {
			var route_directions = {};

			// Loop over stops
			_.each(data, function (item) {
				var routeId = item.route_id,
					runId = item.run_id;

				// Check for route key
				if (!(routeId in route_directions)) {
					route_directions[routeId] = {};
				}

				// Check for direction key
				var runSuffix = runId.substr(runId.length - 1);

				if (!(runSuffix in route_directions[routeId])) {
					route_directions[routeId][runSuffix] = [];
				}

				// Add prediction
				route_directions[routeId][runSuffix].push(item.minutes);
			});

			return route_directions;
		}
	};
}());

APP.data.init();