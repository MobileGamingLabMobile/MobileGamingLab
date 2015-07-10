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
    this.socket.emit('authenticate', {access_token: this.token, gameSession: this.gameSession});

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
    //Dummy data
    this.data.finishedQuests.push({
        _id: 123312,
        title: "nur ein test",
        description: {
            html: "nochmal Hallo",
            name: "Hallo"
        },
        started: false
    });

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

    this.getPosition();
};

GameInterface.prototype.getPosition = function () {
    var GI = this;
    //initial position
    //GI.body.map.updatePlayerPos(51.969430, 7.595814);

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

        var getPos = function () {
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError)
        };

        var sendPos = function () {
            GI.socket.emit("Player", GI.body.map.playerPos);
        };

        window.setInterval(getPos, 500);
        window.setInterval(sendPos, 5000);

        //GI.body.map.addLocator();


        //var watchId = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError);




    }, false);
};

GameInterface.prototype.loadData = function () {
    var that = this;

    this.socket.on("Player", function (data) {
        console.log(data);
    });
    this.socket.on("MapItem", function (data) {
        switch (data.operation) {
            case("visible"):
                that.body.map.addMapItem(data);
                break;
            case("add"):
                that.body.map.addMapItem(data);
                break;
            case("remve"):
                that.body.map.removeMapItem(data);
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
        that.popup.questEvent(data);
    });
};