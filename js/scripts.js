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
		var newMarker = this.addMarker(airport);
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
	var contentString = '<div class="infowindowcontent>'+
		'<div class="row">' +
		'<p class="total greenbk">78.3%</p>' +
		'<p class="location">NEW YORK NY</p>' +
		'<p class="code">JFK</p>' +
		'</div>' +
		'<div class="data">' +
		'<p class="tagbelow">Avg On-Time</p>' +
		'<p class="label">Arrivals</p>' +
		'<p class="details">76% (8,590)</p>' +
		'<p class="label">Departures</p>' +
		'<p class="details">80.5% (8,589)</p>' +
		'<p class="coords">' + defaultLat + ', ' + defaultLng + '</p>' +
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

// Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
