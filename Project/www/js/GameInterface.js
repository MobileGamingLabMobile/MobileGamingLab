//GameInterface Class
var GameInterface = function (properties, data) {
    this.data = data;
    this.header = null;
    this.body = null;
    this.footer = null;
    this.quests = [];
    this.inventarItems = [];
    this.unreadQuests = 0;
    this.socket = null;

    this.initialize(properties.header, properties.body, properties.footer);
};

GameInterface.prototype.initialize = function (_header, _body, _footer) {
    this.loadInitialData();
    this.loadData();

    this.header = new Header(_header, this);
    this.body = new Container(_body, this);
    this.footer = new Container(_footer, this);
};

GameInterface.prototype.loadInitialData = function () {
    console.log(this.data);
    //Quests
    var that = this;
    $.each(this.data.availableQuests, function (index) {
       console.log(that.data.availableQuests[index]);
    });
    $.each(this.data.finishedQuests, function (index) {
       console.log(that.data.availableQuests[index]);
    });
    
};

GameInterface.prototype.loadData = function () {
    var that = this;
    this.socket = io.connect("localhost:8080");
    this.socket.emit("Quests", {"clientName": "socket1"});
     
    this.socket.on("Quests", function (data) {
        if (that.quests[data.quest._id]) {
            that.quests[data.quest._id].data = data;
            console.log(data);
        } else {
            that.quests[data.quest._id] = {
                data: data,
                clicked: false
            }
            that.unreadQuests ++;
            that.footer.buttons.taskButton.addCount(that.unreadQuests, "update");
        } 
    });
    
    this.socket.emit("InventarItems", {"clientName": "socket1"});
    this.socket.on("InventarItems", function (data) {
        that.inventarItems.push(data);
    });
};