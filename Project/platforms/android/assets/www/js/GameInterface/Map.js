/**
 * 
 * @param {type} container
 * @returns {Map}
 */
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
    
    //This is the position of the Player
    this.playerPos = {x: null, y: null};
    this.playerMarker = null;

    this.mapItemsMarker = [];

    this.mapItems = [];

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
        attribution: '',
        maxZoom: 21
    }).addTo(this._map);

    this.markers.addTo(this._map);

    this.locate();
};

Map.prototype.zoomTo = function (lat, lng) {
    this._map.setZoom(18);
    this._map.panTo(new L.LatLng(lat, lng));
}

Map.prototype.addMarker = function (lat, lng) {
    var marker = L.marker(L.latLng(lat, lng));
    marker.on('click', function (e) {
        //cast popup here
        console.log("Marker click");
        console.log(e);
    });
    this.markers.addLayer(marker);
};

Map.prototype.testPosition = function (x1, y1, x2, y2) {
    var buffer = 0.00001;
    if (x1 < x2 + buffer && x2 > x2 - buffer && y1 < y2 + buffer && y1 > y2 - buffer) {
        return true;
    } else {
        return false;
    }
};

Map.prototype.addMapItem = function (data) {
    this.mapItems[data.id] = this.getMapItem(data.position);
    this.mapItems[data.id].addTo(this._map);
};

Map.prototype.removeMapItem = function (data) {
    try {
        this._map.remove(this.mapItems[data.id]);
    } catch (e) {
        console.log(e);
    }
}

Map.prototype.addLocator = function () {
    var that = this;
    var locateButton = L.control({position: 'topright'});
    locateButton.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');
        var inner = '<a id="locate" class="button round right"><img src="img/locate.png" /></a>';
        div.innerHTML = inner;
        return div;
    };
    locateButton.addTo(this._map);
    $('#locate').on('click', function () {
        that._map.panTo(new L.LatLng(that.playerPos.x, that.playerPos.y));
    });
};

Map.prototype.updatePlayerPos = function (x, y) {
    //Switch because database and leaflet need them the other way round
    this.playerPos.x = y;
    this.playerPos.y = x;
    this.drawPlayer();
};

Map.prototype.drawPlayer = function () {
    var greenIcon = L.icon({
        iconUrl: 'img/officer-icon.png',
        iconSize: [40, 40]
    });
    //Switch because database and leaflet need them the other way round
    if (!this.playerMarker) {
        this.playerMarker = L.marker(L.latLng(this.playerPos.y, this.playerPos.x), {icon: greenIcon}).addTo(this._map);
    } else {
        this.playerMarker.setLatLng(L.latLng(this.playerPos.y, this.playerPos.x), {icon: greenIcon});
    }
};

Map.prototype.getMapItem = function (pos) {
    var that = this;
    var item = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": pos
        },
        "properties": {
            "name": "Map Item"
        }
    }

    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    return L.geoJson(item, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    });
};

Map.prototype.locate = function () {

};

