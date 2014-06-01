APP.home = function () {
	return {
		init: function ()
		{
			// Get stop names
			var stops = APP.config.stops;
			// 	stop_name = {};

			// _.each(stops, function (stop) {
			// 	APP.data.getStopName(stop, function (data) {
			// 		stop_name[stop] = data;
			// 		console.log(stop_name);
			// 	});
			// });

			// Get predictions
			APP.data.getPredictions(stops, function (predictions)
			{
				// Loop over stops
				_.each(predictions, function (routes, stop) {
					
					// Get stop name
					APP.data.getStopName(stop, function (stopName) {
					
					// Make DOM element
					var stopDiv = "<div><%= stopName %></div>",
						stopDivString = _.template(stopDiv, {stopName: stopName});
					
					// Append
					$('body').append($.parseHTML(stopDivString));
					
					// Loop over routes
						// Loop over directions
							// Make route-direction row and populate predictions
				});


				});
			});
		},
	};
}();

