var Header = function (properties, GI) {
    this.$container = $('<div/>', {
        class: 'small-12'
    }).appendTo($('#gamecontainer'));
    
    this.$map = null;
    this.GI = GI;
    this.setProperties(properties);
};

Header.prototype = new Container;

Header.prototype.setProperties = function (properties) {
    var that = this;
    for (var prop in properties) {
        switch (prop) {
            case('gamename'):
                $headline = $('<a class="button radius tiny left" id="quitbutton">Spiel beenden</a> <h1>' + properties[prop] + '</h1>');
                $headline.appendTo(this.$container);
                $('#quitbutton').on('click', function () {
                    //TODO: Disconnect socket
                    window.window.location.href = "#gameselection";
                    that.GI.socket.disconnect();
                });
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