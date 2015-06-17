//GameInterface Class
var GameInterface = function (properties) {
    this.header = null;
    this.body = null;
    this.footer = null;
    
    this.initialize(properties.header, properties.body, properties.footer);
};

GameInterface.prototype.initialize = function (_header, _body, _footer) {
    this.header = new Header(_header, this);
    this.body = new Container(_body, this);
    this.footer = new Container(_footer, this);
};