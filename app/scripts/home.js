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
						console.log(stopName)
						var stopDiv = ' \
							<div class="stop" id="stop-<%= stopId %>"> \
								<p class="stop-name"><%= stopName %></p> \
						</div> \
						',
							stopDivString = _.template(stopDiv, {
								stopName: stopName,
								stopId: stop
							});

						console.log(stopDivString)
						
						// Append
						$('#transit').append($.parseHTML(stopDivString));
						

						var routeDiv = ' \
				            <div class="route" id="route-<%= routeId %>-<%= directionId %>"> \
				            <span class="route-id"><%= routeId %></span> \
				            <span class="route-name"><%= directionName %></span> \
				            <span class="arrivals"><%= arrivals %></span> \
				            </div>';

						// Loop over routes
						// TODO: sort numerically
						// _.each(routes, function (directions, route) {
						var routesSorted = _.map(routes, function (value, key) { return key; });
						console.log(routesSorted);


						_.each(routesSorted, function (route) {
							// Get directions
							var directions = routes[route];

							// Loop over directions
							_.each(directions, function (predictions, direction)
							{
								// Get direction name
								APP.data.getDirectionName(route, direction, function(directionName)
								{
									// Make route-direction row and populate predictions
									var arrivals = predictions.join(', '),
										routeDivString = _.template(routeDiv, {
											routeId: route,
											directionId: direction,
											directionName: directionName,
											arrivals: arrivals
										});

									// Get stop div
									var $stop = $('#stop-' + stop);
									$stop.append($.parseHTML(routeDivString));
									
								}); // end get direction name
							}); // end loop directions
						}); // end loop routes
					}); // end get stop name
				}); // end loop stops
			});
		},
	};
}();

