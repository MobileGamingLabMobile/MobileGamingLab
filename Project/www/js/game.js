App.controller("gameController", function ($scope, $http, $routeParams) {

    $scope.token = window.sessionStorage.getItem("token");
    $scope.gameID = window.sessionStorage.getItem("gameID");


    getProperties = function (name) {
        return  {
            header: {
                gamename: name,
                background: 'white',
                height: 25,
                elements: {
                    button1: {
                        type: "button",
                        subtype: "help",
                        align: "left"
                    },
                    label1: {
                        type: "label",
                        id: "currentTaskLabel",
                        text: "---",
                        align: "right"
                    },
                    label2: {
                        type: "label",
                        id: "timeLabel",
                        text: "--:--:--",
                        align: "right"
                    }
                }
            },
            body: {
                background: "white",
                height: 60,
                map: true
            },
            footer: {
                background: "white",
                height: 10,
                elements: {
                    button1: {
                        type: "button",
                        subtype: "task",
                        id: "taskButton",
                        text: "Aufgaben"
                    },
                    button2: {
                        type: "button",
                        subtype: "item",
                        id: "Inventar",
                        text: "Items"
                    },
                    button3: {
                        type: "button",
                        subtype: "option",
                        id: "optionButton",
                        text: "Optionen"
                    }
                }
            }
        };
    };

    execute();

    function execute() {
        $http.post("http://giv-mgl.uni-muenster.de:8080/" + $scope.gameID + "/play", {
            access_token: $scope.token
        }).success(function (data) { 
            console.log(data);
            $http.get("http://giv-mgl.uni-muenster.de:8080/games/" + $scope.gameID + "/?access_token=" + $scope.token).success(function (gdata) {
                if (gdata.success)
                {
                    switch(data.status) {
                        case 'started': 
                            var popup = new Popup();
                            popup.open();
                            popup.selectRole(data.gameSession.roles);
                            $(popup).on("role_selected", function (event, roleid) {
                                console.log("http://giv-mgl.uni-muenster.de:8080/session/" + data.gameSession._id + "/selectRole");
                                $http.post("http://giv-mgl.uni-muenster.de:8080/session/" + data.gameSession._id + "/selectRole", {
                                    access_token: $scope.token,
                                    role_id: roleid
                                }).success(function (_data) {
                                    var GI = new GameInterface(getProperties(gdata.game[0].metadata.name), _data.playerInstance);
                                });
                            });
                            break;
                        case 'role_selected':
                            console.log(data);
                            break;
                        case 'resume':
                            var GI = new GameInterface(getProperties(gdata.game[0].metadata.name), data.playerInstance);
                            break;
                    }
                }
                /*if (gdata.success)
                {
                    var GI = new GameInterface(getProperties(gdata.game[0].metadata.name), data.gameSession);
                    
                    if(data.gameSession.players.length != 0) {
                        //console.log("Rolle schon ausgewählt");
                    } else {
                        //console.log("Rolle auswählen");
                        var popup = new Popup();
                        popup.open();
                        var is = false;
                        if(data.message == "Resuming Game Session") {
                            is = true;
                        };
                        popup.selectRole(data.gameSession.roles, is);
                        $(popup).on("role_selected", function (event, role) {
                            $http.post("http://giv-mgl.uni-muenster.de:8080/" + $scope.gameID + "/selectRole", {
                                access_token: $scope.token,
                                role_id: role
                            }).success(function (data) {
                                console.log(data);
                            });
                        });
                        
                        
                        
                    }
                }*/
            });

        });
    }
    ;
});


