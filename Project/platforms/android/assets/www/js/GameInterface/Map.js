var Map = function (container) {
    this.$map = $('<div/>', {
        'class': 'map',
        'id': 'map',
        'style': 'height:100%;width:100%;'
    }).appendTo(container.$container);
    
    this.initialize(container);
};

Map.prototype.get = function () {
    return this.$map;
}

Map.prototype.initialize = function (container) {
    var styles = [
        'Road',
        'Aerial',
        'AerialWithLabels',
        'collinsBart',
        'ordnanceSurvey'
    ];
    container.$map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                    imagerySet: styles[2]})
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([7.623411, 51.959184], 'EPSG:4326', 'EPSG:3857'),
            zoom: 13
        })
    });
};


