App.controller("gameController", function ($scope, $http, $routeParams) {

    $scope.token = window.sessionStorage.getItem("token");
    $scope.gameID = window.sessionStorage.getItem("gameID");


    getProperties = function (name) {
        return  {
            header: {
                gamename: name,
                background: 'white',
                height: 20,
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
                height: 65,
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
            $http.get("http://giv-mgl.uni-muenster.de:8080/games/" + $scope.gameID + "/?access_token=" + $scope.token).success(function (gdata) {
                if (gdata.success)
                {
                    var GI = new GameInterface(getProperties(gdata.game[0].metadata.name), data.gameSession);
                }
            });

        });
    }
    ;
});


