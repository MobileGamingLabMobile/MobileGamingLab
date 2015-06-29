//GameInterface Class
var GameInterface = function (properties) {
    this.header = null;
    this.body = null;
    this.footer = null;
    this.quests = [];
	this.inventarItems = [];
	
    this.initialize(properties.header, properties.body, properties.footer);
};

GameInterface.prototype.initialize = function (_header, _body, _footer) {
    this.loadData();
	
	this.header = new Header(_header, this);
    this.body = new Container(_body, this);
    this.footer = new Container(_footer, this);
};

GameInterface.prototype.loadData = function () {
	var that = this;
	socket = io.connect("https://giv-mgl.uni-muenster.de:3035");
	socket.emit("Quests",{"clientName":"socket1"});
	socket.on("Quests",function(data){ 
		if (that.quests[data.quest._id]) {
			that.quests[data.quest._id].data = data;
		} else {
			that.quests[data.quest._id] = {
				data: data,
				clicked: false
			}
		}
		
	});
	socket.emit("InventarItems",{"clientName":"socket1"});
	socket.on("InventarItems",function(data){ 
		that.inventarItems.push(data);
	});
};