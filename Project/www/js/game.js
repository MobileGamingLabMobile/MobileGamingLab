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
    execute();
    
    function execute () {
        var GI = new GameInterface(properties);
    };    
});


