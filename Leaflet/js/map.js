function map(){

// View auf Münster
    var map = L.map('map').setView([51.96505, 7.6125], 14);

// Map integrieren
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/maxitwel.k5hb29n8/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
    }).addTo(map);

// Geolocation
    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius, {
            color: '#2ba6cb',
            fillColor: '#2ba6cb',
            fillOpacity: 0.5
        }).addTo(map);
    }

    function onLocationError(e) {
        map.setView([51.96935, 7.59588], 15);
        alert(e.message);
    }


    map.on('locationfound', onLocationFound);
    map.on('locationerror', map.setView([51.96935, 7.59588], 13), onLocationError);

    map.locate({setView: true, maxZoom: 17});

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [40, 40],
            iconAnchor:   [20, 20],
            popupAnchor:  [0, 0]
        }
    });

// verschieden Punkt zur vsuellen Unterscheidung der Quests (bereits erledigt, gerade dabei, schon erledigt)
    var punktRot = new LeafIcon({iconUrl: 'img/punktRot.png'}),
        punktGelb = new LeafIcon({iconUrl: 'img/punktGelb.png'}),
        punktGruen = new LeafIcon({iconUrl: 'img/punktGruen.png'});
        punktBlau = new LeafIcon({iconUrl: 'img/punktBlau.png'});

// Beispielmarker gesetzt
    L.marker([51.9693, 7.595], {icon: punktRot}).addTo(map).bindPopup("noch nicht gespielte Quests");
    L.marker([51.9695, 7.596], {icon: punktGruen}).addTo(map).bindPopup("erfolgreich gespielte Quests");
    L.marker([51.9697, 7.597], {icon: punktGelb}).addTo(map).bindPopup("nzur Zeit gespielte Quests / nicht beendete Quests");
    L.marker([51.9693, 7.599], {icon: punktBlau}).addTo(map).bindPopup("noch nicht gespielte Quests");

// GPS Verbindung initialisieren
    map.addControl( new L.Control.Gps({autoActive:true}) );
}

// GPS Lokalisierung
(function gps() {

L.Control.Gps = L.Control.extend({

	includes: L.Mixin.Events,
	options: {
		autoActive: false,		
		autoCenter: false,		
		maxZoom: null,			
		textErr: null,			
		callErr: null,			
		style: {				
			radius: 5,
			weight: 2,
			color: '#c20',
			opacity: 1,
			fillColor: '#f23',
			fillOpacity: 1
		},
		marker: null,			
		accuracy: true,		
		title: 'Center map on your location',
		position: 'topleft',
		transform: function(latlng) { return latlng },
		setView: false
	},

	initialize: function(options) {
		if(options && options.style)
			options.style = L.Util.extend({}, this.options.style, options.style);
		L.Util.setOptions(this, options);
		this._errorFunc = this.options.callErr || this.showAlert;
		this._isActive = false;
		this._firstMoved = false;
		this._currentLocation = null;
	},

	onAdd: function (map) {

		this._map = map;

		var container = L.DomUtil.create('div', 'leaflet-control-gps');

		this._button = L.DomUtil.create('a', 'gps-button', container);
		this._button.href = '#';
		this._button.title = this.options.title;
		L.DomEvent
			.on(this._button, 'click', L.DomEvent.stop, this)
			.on(this._button, 'click', this._switchGps, this);

		this._alert = L.DomUtil.create('div', 'gps-alert', container);
		this._alert.style.display = 'none';

		this._gpsMarker = this.options.marker ? this.options.marker : new L.CircleMarker([0,0], this.options.style);
		
		this._map
			.on('locationfound', this._drawGps, this)
			.on('locationerror', this._errorGps, this);

		if(this.options.autoActive)
			this.activate();

		return container;
	},

	onRemove: function(map) {
		this.deactivate();
	},

	_switchGps: function() {
		if(this._isActive)
			this.deactivate();
		else
			this.activate();
	},

	getLocation: function() {	
		return this._currentLocation;
	},

	activate: function() {
		this._isActive = true;
		this._map.addLayer( this._gpsMarker );
		this._map.locate({
			enableHighAccuracy: true,
			watch: true,
			setView: this.options.setView,	
			maxZoom: this.options.maxZoom
		});
	},

	deactivate: function() {
			this._isActive = false;
		this._firstMoved = false;
		this._map.stopLocate();
		L.DomUtil.removeClass(this._button, 'active');
		this._map.removeLayer( this._gpsMarker );
		this.fire('gpsdisabled');
	},

	_drawGps: function(e) {
		this._currentLocation = this.options.transform(e.latlng);
			
		this._gpsMarker.setLatLng(this._currentLocation);

		if(this._isActive && (!this._firstMoved || this.options.autoCenter))
			this._moveTo(this._currentLocation);
			
		this.fire('gpslocated', {latlng: this._currentLocation, marker: this._gpsMarker});
		
		L.DomUtil.addClass(this._button, 'active');
	},

	_moveTo: function(latlng) {
		this._firstMoved = true;
		if(this.options.maxZoom)
			this._map.setView(latlng, Math.min(this._map.getZoom(), this.options.maxZoom) );
		else
			this._map.panTo(latlng);
	},

	_errorGps: function(e) {
		this.deactivate();
		this._errorFunc.call(this, this.options.textErr || e.message);
	},

/*	_updateAccuracy: function (event) {
		var newZoom = this._map.getZoom(),
			scale = this._map.options.crs.scale(newZoom);
		this._gpsMarker.setRadius(this.options.style.radius * scale);
		this._gpsMarker.redraw();
	},
*/
	showAlert: function(text) {
            this._alert.style.display = 'block';
            this._alert.innerHTML = text;
            var that = this;
            clearTimeout(this.timerAlert);
            this.timerAlert = setTimeout(function() {
		that._alert.style.display = 'none';
            }, 5);
	}
});

L.control.gps = function (options) {
	return new L.Control.Gps(options);
};

}).call(this);
