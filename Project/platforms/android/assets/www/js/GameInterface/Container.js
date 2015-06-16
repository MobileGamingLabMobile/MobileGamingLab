var Container = function (properties, GI) {
    this.$container = $('<div/>', {
        class: 'small-12'
    }).appendTo($('#gamecontainer'));
    
    this.map = null;
    this.GI = GI;
    
    this.setProperties(properties);
};

Container.prototype.setProperties = function (properties) {
    for (var prop in properties) {
        switch (prop) {
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
                if(properties[prop]) {
                    this.addMap();
                }
                break;
        }
    }
};

Container.prototype.setHeight = function (height) {
    this.$container.css('height', this.convertpCentToPixel(height));
};

Container.prototype.setBackgroundColor = function (color) {
    this.$container.css('background-color', color);
};

Container.prototype.convertpCentToPixel = function (pCent) {
    var Pixel = $(window).height() / 100 * pCent;
    return Pixel;
};

Container.prototype.addMap = function () {
    this.map = new Map(this.$container);
};

Container.prototype.addElement = function (element) {
    switch (element.type) {
        case('button'):
            this.addButton(element);
            break;
        case('label'):
            this.addLabel(element);
            break;
    }
};

Container.prototype.addButton = function (properties) {
    switch(properties.subtype) {
        case('help'):
            $button = new HelpButton(properties);
            $button.appendTo(this.$container);
            break;
        case('option'):
            $button = new OptionButton(properties, this.GI);
            $button.appendTo(this.$container);
            $button.css("width", "33.3%");
            break;
        case('task'):
            $button = new TaskButton(properties, this.GI);
            $button.appendTo(this.$container);
            $button.css("width", "33.3%");
            break;
        case('item'):
            $button = new ItemButton(properties, this.GI);
            $button.appendTo(this.$container);
            $button.css("width", "33.3%");
            break;
    }
};

Container.prototype.addLabel = function (properties) {
    $label = new Label(properties);
    $label.appendTo(this.$container);
};