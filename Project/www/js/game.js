App.controller("gameController", function () {
  
    var properties = {
        header: {
            gamename: 'Mister X',
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
                    text: "Task 1",
                    align: "right"
                },
                label2: {
                    type: "label",
                    id: "timeLabel",
                    text: "00:01:02",
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
                    text: "Aufgaben",
                    align: "left"
                },
                button2: {
                    type: "button",
                    subtype: "item",
                    id: "Inventar",
                    text: "Items",
                    align: "center"
                },
                button3: {
                    type: "button",
                    subtype: "option",
                    id: "optionButton",
                    text: "Optionen",
                    align: "right"
                }
            }
        }
    };
    execute();
    
    function execute () {
        var GI = new GameInterface(properties);
    };    
});


