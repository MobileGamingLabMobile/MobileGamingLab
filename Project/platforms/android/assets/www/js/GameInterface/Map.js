var Map = function (container) {
    this.$map = $('<div/>', {
        'class': 'map',
        'id': 'map',
        'style': 'height:100%;width:100%;'
    }).appendTo(container);

    this._map = L.map('map').setView([51.96505, 7.6125], 14);
    this.LeafletIcon = L.Icon.extend({
        options: {
            iconSize: [10, 10],
            iconAnchor: [5, 5],
            popupAnchor: [0, 0]
        }
    });
    this.markers = new L.layerGroup();
    
    this.dots = {
        red: new this.LeafletIcon({iconUrl: 'img/punktRot.png'}),
        yellow: new this.LeafletIcon({iconUrl: 'img/punktGelb.png'}),
        green: new this.LeafletIcon({iconUrl: 'img/punktGruen.png'}),
        blue: new this.LeafletIcon({iconUrl: 'img/punktBlau.png'})
    };

    this.initialize(container);
};

Map.prototype.get = function () {
    return {
        dom: this.$map,
        object: this._map
    };
};

Map.prototype.initialize = function (container) {
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/maxitwel.k5hb29n8/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(this._map);
    
    this.markers.addTo(this._map);
    
    this.locate();
};

Map.prototype.addMarker = function (lat, lng) {
    var marker = L.marker(L.latLng(lat, lng));
    marker.on('click', function (e) {
        //cast popup here
        console.log("Marker click");
        console.log(e);
    });
    this.markers.addLayer(marker);
};

Map.prototype.locate = function () {
    this._map.locate({setView: true, maxZoom: 17});

    this._map.addControl(new GPS({autoActive: true}));

    L.control.gps = function (options) {
        return new GPS(options);
    };
};

