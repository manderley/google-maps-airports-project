var map;

var defaultLat = 40.6413111;
var defaultLng = -73.77813909;

function loadMap() {
	
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(defaultLat, defaultLng),
		styles: appleStyle
	};

	// Get the id of the map container div
	var mapid = document.getElementById('map-container');

	// Create the map
	map = new google.maps.Map(mapid, mapOptions);

	// Create marker for each airport
	for (var i = 0; i < airportData.length; i++) {
		
		var airport = airportData[i];

		// Avg percentage
		airport.totalper = (airport.aper + airport.dper) / 2;

		// Total flights
		airport.totalflights = (airport.aop + airport.dop);

		// Set icon colour
		airport.icon = 'green';

		// Set icon size
		airport.iconsize = new google.maps.Size(32,32);

		var newMarker = this.addMarker(airport);
		
		newMarker.airport = airport;
		
		addInfoWindow(newMarker);
	}

}

function addMarker(airport) {
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(airport.lat, airport.lng),
		map: map,
		icon: {
			url: 'img/airplane-green.png',
			size: new google.maps.Size(32,32),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(16,32),
			scaledSize: new google.maps.Size(32,32)
		},
		title: airport.airport
	});
	return marker;
}

function addInfoWindow(marker) {

	var details = marker.airport;

	var contentString = '<div class="infowindowcontent">'+
		'<div class="row">' +
		'<p class="total ' + details.icon+'bk">' + Math.round(details.totalper*10)/10 + '%</p>' +
		'<p class="location">' + details.airport.split("(")[0].substring(0,19) + '</p>' +
		'<p class="code">' + details.code +'</p>' +
		'</div>' +
		'<div class="data">' +
		'<p class="tagbelow">Avg On-Time</p>' +
		'<p class="label">Arrivals</p>' +
		'<p class="details">' + details.aper + '% ('+ addCommasToNumber(details.aop) + ')</p>' +
		'<p class="label">Departures</p>' +
		'<p class="details">' + details.dper + '% (' + addCommasToNumber(details.dop) + ')</p>' +
		'<p class="coords">' + details.lat + ', ' + details.lng + '</p>' +
		'</div>' +
		'</div>';

	var infoWindow = new google.maps.InfoWindow({
		content: contentString,
		disableAutoPan: false,
		maxWidth: 300,
		zIndex: 1
	});

	google.maps.event.addListener(marker, 'click', function(e) {
		infoWindow.open(map, marker);
	})
}

function addCommasToNumber(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
