App.controller("gameController", function () {
    var properties = {
        header: {
            background: 'green',
            height: 10,
            elements: {
                button1: {
                    type: "button",
                    id: "ThisIsAnFirstId",
                    text: "FirstName",
                    align: "left"
                },
                button2: {
                    type: "button",
                    id: "ThisIsAnSecondId",
                    text: "SecondName",
                    align: "right"
                },
                button3: {
                    type: "button",
                    id: "ThisIsAnThirdId",
                    text: "ThirdName",
                    align: "right"
                },
                button4: {
                    type: "button",
                    id: "ThisIsAnFourthId",
                    text: "FourthName",
                    align: "left"
                }
            }
        },
        body: {
            background: "red",
            height: 80,
            map: true
        },
        footer: {
            background: "blue",
            height: 10,
            elements: {
            }
        }
    };
    $('#textarea').val(JSON.stringify(properties, null, 4));
    execute();
    
    function execute () {
        var _prop = JSON.parse($('#textarea').val());
        var GI = new GameInterface(_prop);
    };
    
    $('#executeButton').on('click', function (e) {
        $('#gamecontainer').html("");
        execute();
    });
    
});


