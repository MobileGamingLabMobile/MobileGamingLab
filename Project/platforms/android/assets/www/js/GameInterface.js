//GameInterface Class
var GameInterface = function (properties) {
    this.$header;
    this.$body;
    this.$footer;
    this.$map;
    this._map = null;
    this.properties = properties;
    this.Initialize();
};

GameInterface.prototype.Initialize = function () {
    this.Header();
    this.Body();
    this.Footer();
};

GameInterface.prototype.Header = function () {
    this.$header = $('<div/>', {
        id: 'gameheader',
        class: 'small-12'
    }).appendTo($('#gamecontainer'));

    for (var ele in this.properties.header) {
        switch (ele) {
            case('background'):
                if (this.properties.header[ele]) {
                    this.Header.setBackgroundColor(this, this.properties.header[ele]);
                }
                break;
            case('height'):
                if (this.properties.header[ele]) {
                    this.Header.setHeight(this, this.properties.header[ele]);
                }
                break;
            case('elements'):
                var elements = this.properties.header[ele];
                for (var element in elements) {
                    this.Header.addElement(this, elements[element]);
                }
                break;
        }
    }
};

GameInterface.prototype.Body = function () {
    this.$body = $('<div/>', {
        id: 'gamebody',
        class: 'small-12'
    }).appendTo($('#gamecontainer'));

    for (var ele in this.properties.body) {
        switch (ele) {
            case('background'):
                if (this.properties.body[ele]) {
                    this.Body.setBackgroundColor(this, this.properties.body[ele]);
                }
                break;
            case('height'):
                if (this.properties.body[ele]) {
                    this.Body.setHeight(this, this.properties.body[ele]);
                }
                break;
            case('map'):
                if (this.properties.body[ele]) {
                    this.Body.addMap(this);
                }
                break;
        }
    }
};

GameInterface.prototype.Footer = function () {
    this.$footer = $('<div/>', {
        id: 'gamefooter',
        class: 'small-12'
    }).appendTo($('#gamecontainer'));

    for (var ele in this.properties.footer) {
        switch (ele) {
            case('background'):
                if (this.properties.footer[ele]) {
                    this.Footer.setBackgroundColor(this, this.properties.footer[ele]);
                }
                break;
            case('height'):
                if (this.properties.footer[ele]) {
                    this.Footer.setHeight(this, this.properties.footer[ele]);
                }
                break;
            case('elements'):
                
                break;
            case('rows'):
                var rows = this.properties.footer[ele];
                for (var row in rows) {
                    $row = new this._Row();
                    this.Footer.addRow(this, $row);                   
                    var elements = rows[row].elements;
                    for (var element in elements) {
                        this._Row.addElement(this, $row, elements[element]);
                    }
                }
                break;
        }
    }
};

GameInterface.prototype.Header.setBackgroundColor = function (GI, color) {
    GI.$header.css('background-color', color);
};

GameInterface.prototype.Header.setHeight = function (GI, height) {
    GI.$header.css('height', GI.convertpCentToPixel(height));
};

GameInterface.prototype.Body.setBackgroundColor = function (GI, color) {
    GI.$body.css('background-color', color);
};

GameInterface.prototype.Body.setHeight = function (GI, height) {
    GI.$body.css('height', GI.convertpCentToPixel(height));
};

GameInterface.prototype.Body.addMap = function (GI) {
    $map = GI._Map();
    $map.appendTo(GI.$body);
    GI._Map.initialize(GI);
};

GameInterface.prototype.Footer.setBackgroundColor = function (GI, color) {
    GI.$footer.css('background-color', color);
};

GameInterface.prototype.Footer.setHeight = function (GI, height) {
    GI.$footer.css('height', GI.convertpCentToPixel(height));
};

GameInterface.prototype.Header.addElement = function (GI, element) {
    switch (element.type) {
        case('button'):
            this.addButton(GI, element);
            break;
        case('label'):
            this.addLabel(GI, element);
            break;
    }
};

GameInterface.prototype.Header.addButton = function (GI, properties) {
    $button = GI._Button(properties);
    $button.appendTo(GI.$header);
    $button.css("height", $button.parent().height());
    $button.css("width", $button.parent().width()/4-0.1);
};

GameInterface.prototype.Header.addLabel = function (GI, properties) {
    $label = GI._Label(properties);
    $label.appendTo(GI.$header);
};

GameInterface.prototype.Footer.addRow = function (GI, element) {
    element.appendTo(GI.$footer);
    element.css("height", "50%");
};

GameInterface.prototype.Footer.addElement = function (GI, element) {
    switch (element.type) {
        case('button'):
            this.addButton(GI, element);
            break;
        case('label'):
            this.addLabel(GI, element);
            break;
    }
};

GameInterface.prototype.Footer.addButton = function (GI, properties) {
    $button = GI._Button(properties);
    $button.appendTo(GI.$footer);
};

GameInterface.prototype.Footer.addLabel = function (GI, properties) {
    $label = GI._Label(properties);
    $label.appendTo(GI.$footer);
};

GameInterface.prototype._Button = function (properties) {
    var _class = 'button';
    if (properties.align) {
        _class += ' ' + properties.align;
    }

    return $('<a/>', {
        'class': _class,
        'id': properties.id,
        'text': properties.text
    });
};

GameInterface.prototype._Label = function (properties) {
    return $('<label/>', {
        id: properties.id,
        text: properties.text
    });
};

GameInterface.prototype._TextField = function (properties) {
    return $('<input/>', {
        id: properties.id,
        text: properties.text
    });
};

GameInterface.prototype._TextArea = function (properties) {
    return $('<textarea/>', {
        id: properties.id,
        text: properties.text
    });
};

GameInterface.prototype._Container = function (properties) {
    return $('<div/>', {
        id: properties.id,
        class: properties.class,
        style: 'height:' + properties.height + '%'
    });
};

GameInterface.prototype._Row = function () {
    return $('<div/>', {
        class: 'row'
    });
};

GameInterface.prototype._Row.addElement = function (GI, Row, element) {
    switch (element.type) {
        case('button'):
            this.addButton(GI, Row, element);
            break;
        case('label'):
            this.addLabel(GI, Row, element);
            break;
    }
};

GameInterface.prototype._Row.addButton = function (GI,Row, properties) {
    $button = GI._Button(properties);
    $button.appendTo(Row);
    Row.css("backgroundcolor", "yellow");
    $button.css("height", "100%");
    $button.css("width", "100%");
    $button.css("padding", "none");
    $button.css("margin", "none");

};

GameInterface.prototype._Row.addLabel = function (GI, Row, properties) {
    $label = GI._Label(properties);
    $label.appendTo(Row);
};

GameInterface.prototype._Container.add = function (GI, element) {
    switch (element.type) {
        case('button'):
            $button = GI._Button(element);
            $button.appendTo(this);
            break;
    }
};

GameInterface.prototype._Map = function () {
    return $('<div/>', {
        'class': 'map',
        'id': 'map',
        'style': 'height:100%;width:100%;'
    });
};

GameInterface.prototype._Map.initialize = function (GI) {
    var styles = [
        'Road',
        'Aerial',
        'AerialWithLabels',
        'collinsBart',
        'ordnanceSurvey'
    ];
    GI.$map = new ol.Map({
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

GameInterface.prototype.convertpCentToPixel = function (pCent) {
    var Pixel = $(window).height() / 100 * pCent;
    return Pixel;
};

