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
            height: 60,
            map: false
        },
        footer: {
            background: "blue",
            height: 30,
            rows: {
                row1: {
                    elements: {
                        button5: {
                             type: "button",
                             id: "ThisIsAnFifthId",
                             text: "FifthName",
                             align: "left"
                         }
                     }
                },
                row2: {
                    elements: {
                        button6: {
                             type: "button",
                             id: "ThisIsAnSixthId",
                             text: "SixthName",
                             align: "left"
                         }
                     }
                }
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


