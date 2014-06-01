// require('spaghetti-code-nightmare');

APP.home = function ()
{
	var stops = APP.config.stops,
		timer;

	return {
		init: function ()
		{
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
							<hr> \
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
				            <span class="arrivals"> \
					            <span class="arrival-1"><%= arrival1 %></span> \
					            <span class="arrival-2"><%= arrival2 %></span> \
					            <span class="arrival-3"><%= arrival3 %></span> \
					        </span> \
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
										routeDivString = _.template(routeDiv, {
											routeId: route,
											directionId: direction,
											directionName: directionName,
											arrival1: predictions[0],
											arrival2: predictions[1],
											arrival3: predictions[2],
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

			// Start timer
			timer = setInterval(function () { APP.home.update(); }, 6000);
			
			// Supa hack to kill timer
			window.kill = function () {
				clearInterval(timer);
			};

		}, // end init

		update: function ()
		{
			// Get predictions
			APP.data.getPredictions(stops, function (data)
			{
				// Loop over stops
				_.each(data, function (routes, stop) {
					// Loop over routes
					_.each(routes, function (directions, route) {
						// Loop over directions (this corresonds to one route row)
						_.each(directions, function (predictions, direction) {
							// Update prediction spans

						});
					});
				});
			});
			// Loop over 
		},
	};
}();

