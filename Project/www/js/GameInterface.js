//GameInterface Class
var GameInterface = function (properties, data, token, gameSession, popup) {
    this.data = data;
    this.header = null;
    this.body = null;
    this.footer = null;
    this.quests = [];
    this.inventarItems = [];
    this.unreadQuests = 0;
    this.socket = null;
    this.gameSession = gameSession;
    this.token = token;
    this.popup = popup;

    this.initialize(properties.header, properties.body, properties.footer);
};

GameInterface.prototype.initialize = function (_header, _body, _footer) {
    //init socket
    this.socket = io.connect("http://giv-mgl.uni-muenster.de:3030");
    this.socket.emit('authenticate', {access_token: this.token, gameSessionID: this.gameSession});

    //load elements
    this.header = new Header(_header, this);
    this.body = new Container(_body, this);
    this.footer = new Container(_footer, this);

    //load data
    this.loadInitialData();
    this.loadData();
};

GameInterface.prototype.loadInitialData = function () {
    //Quests
    var that = this;

    $.each(that.data.availableQuests, function (index) {
        var quest = that.data.availableQuests[index];
        console.log(quest);
        that.quests[quest._id] = {
            clicked: false,
            finished: false,
            data: quest
        };
        that.unreadQuests++;
    });
    $.each(that.data.finishedQuests, function (index) {
        var quest = that.data.finishedQuests[index];
        that.quests[quest._id] = {
            clicked: false,
            finished: true,
            data: quest
        };
        that.unreadQuests++;
    });
    this.footer.buttons.taskButton.addCount(that.unreadQuests, "update");
};

GameInterface.prototype.start = function () {
    var GI = this;
    document.addEventListener('deviceready', function () {
        console.log("deviceready");
        var geolocationSuccess = function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            GI.body.map.updatePlayerPos(lat, lng);
        };

        // onError Callback receives a PositionError object
        //
        function geolocationError(error) {
            console.log(error);
        }
        ;

        //GI.body.map.addLocator();

        var getPos = function () {
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, { enableHighAccuracy: true })
        };

        var sendPos = function () {
            if (GI.body.map.playerPos.x && GI.body.map.playerPos.y) {
                GI.socket.emit("Player", GI.body.map.playerPos);
            }
        };

        window.setInterval(getPos, 500);
        window.setInterval(sendPos, 5000);

        //var watchId = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError);




    }, false);

};

GameInterface.prototype.loadData = function () {
    var that = this;

    this.socket.on("Player", function (data) {
        console.log(data);
    });
    this.socket.on("MapItem", function (data) {
        console.log(data);
        switch (data.operation) {
            case("visible"):
                that.body.map.addMapItem(data.item);
                break;
            case("add"):
                that.body.map.addMapItem(data.item);
                break;
            case("remve"):
                that.body.map.removeMapItem(data.item);
                break;
        }
    });
    this.socket.on("InventarItem", function (data) {
        console.log(data);
    });
    this.socket.on("Quest", function (data) {
        console.log(data);
        $.each(data, function (index) {
            if (that.quests[data[index].ID]) {
                that.quests[data[index].ID].data = data[index];
            } else {
                that.quests[data[index].ID] = {
                    data: data[index],
                    clicked: false
                };
                that.unreadQuests++;
                that.footer.buttons.taskButton.addCount(that.unreadQuests, "update");
            }
        });
    });
    this.socket.on("QuestEvent", function (data) {
        console.log(data);
        that.popup.questEvent(data);
    });
};