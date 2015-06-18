var Header = function (properties) {
    this.$container = $('<div/>', {
        class: 'small-12'
    }).appendTo($('#gamecontainer'));
    
    this.$map = null;
    
    this.setProperties(properties);
};

Header.prototype = new Container;

Header.prototype.setProperties = function (properties) {
    for (var prop in properties) {
        switch (prop) {
            case('gamename'):
                $headline = $('<h1>' + properties[prop] + ' <a href="#profile/{{token}}" class="button radius tiny right">Profil</a> </h1>');
                $headline.appendTo(this.$container);
                break;
            case('background'):
                if (properties[prop]) {
                    this.setBackgroundColor(properties[prop]);
                }
                break;
            case('height'):
                if (properties[prop]) {
                    this.setHeight(properties[prop]);
                }
                break;
            case('elements'):
                var elements = properties[prop];
                for (var element in elements) {
                    this.addElement(elements[element]);
                }
                break;
            case('map'):
                this.addMap();
                break;
        }
    }
};