var TaskButton = function (properties, GI) {
    var _class = 'button radius';
    if (properties.align) {
        _class += ' ' + properties.align;
    }

    this.GI = GI;

    this.$button = $('<a/>', {
        'class': _class,
        'id': 'taskButton',
        'text': properties.text
    });
    this.$button.css('font-size', '75%');
};

TaskButton.prototype = new Button;

TaskButton.prototype.addCount = function (num) {
    if (num != 0) {
        var _size = this.$button.height() * 2;
        this.$button.html('<div style="position:relative;">Aufgaben <img style="position:absolute;right:0;" src="img/punktGelb.png" width="' + _size + '" height="' + _size + '" /><div style="position:absolute;right:0;top:0;height:' + _size + 'px;width:' + _size + 'px;line-height:' + _size + 'px;opacity:1.0;color:black;"><b>' + num + '</b></div></div>');
    } else {
        this.$button.html('Aufgaben');
    }
};

TaskButton.prototype.addEvent = function () {
    var that = this;
    $('#taskButton').on('click', function (e) {
        that.loadPopup();
        $('#popup').foundation('reveal', 'open');

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};

TaskButton.prototype.loadPopup = function () {
    this.GI.unreadQuests = 0;
    this.addCount(0);
    $("#popupcontent").html("<header><b>Aktuelle und abgeschlossene Aufgaben</b></header>");
    var that = this;
    var i = 0;

    for (quest in this.GI.quests) {
        console.log(that.GI.quests[quest]);
        if (that.GI.quests[quest].finished) {
            if (i % 2) {
                var div = "<div style='background-color:#FeFeFe' id='" + quest + "'></div>";
                $('#popupcontent').append(div);
                $("#" + quest).append("<div class='row'><div class='small-6 left'><h5>" + that.GI.quests[quest].data.title + "</h5></div><div class='small-1 right'><img src='img/check_icon.svg' width:'10px' height: '10px'></div></div>");
            } else {
                var div = "<div style='background-color:#EEEEEE' id='" + quest + "'></div>";
                $('#popupcontent').append(div);
                $("#" + quest).append("<div class='row'><div class='small-11 left'><h5>" + that.GI.quests[quest].data.title + "</h5></div><div class='small-1 right'><img src='img/check_icon.svg' width:'10px' height: '10px'></div></div>");
            }
        } else {
            if (that.GI.quests[quest].data.started) {
                var div = "<div style='background-color:#F7FE2E;' id='" + quest + "'></div>";
                $('#popupcontent').append(div);
                $("#" + quest).append("<div><h5>" + that.GI.quests[quest].data.title + "</h5></div>");
            } else {
                if (i % 2) {
                    var div = "<div style='background-color:#FeFeFe' id='" + quest + "'></div>";
                    $('#popupcontent').append(div);
                    $("#" + quest).append("<div><h5>" + that.GI.quests[quest].data.title + "</h5></div>");
                } else {
                    var div = "<div style='background-color:#EEEEEE' id='" + quest + "'></div>";
                    $('#popupcontent').append(div);
                    $("#" + quest).append("<div><h5>" + that.GI.quests[quest].data.title + "</h5></div>");
                }
            }
        }

        $("#" + quest).on('click', function (e) {
            var id = this.id;
            if (!that.GI.quests[id].clicked) {
                var _div = "<div class='row' id='" + id + "_description'>";
                if (!that.GI.quests[id].finished) {
                    if (that.GI.quests[id].data.started) {
                        _div += "<div class='small-6 columns'><a id='" + id + "_start' class='button success'> Abbrechen</a></div>";
                    } else {
                        _div += "<div class='small-6 columns'><a id='" + id + "_start' class='button success'> Starten</a></div>";
                    }
                }
                _div += "<div class='small-6 columns'>" + that.GI.quests[id].data.description.html + '</div>';
                _div += "</div>";
                $('#' + id).append(_div);
                that.GI.quests[id].clicked = true;

                $('#' + id + '_start').on('click', function (e) {
                    if (that.GI.quests[id].data.started) {
                        $('#currentTaskLabel').text('---');
                        that.GI.quests[id].data.started = false;
                        $('#' + id).css('background-color', "#EEEEEE");
                    } else {
                        //Send server that the quest has been started
                        $('#currentTaskLabel').text(that.GI.quests[id].data.title);
                        that.GI.quests[id].clicked = false;
                        that.GI.quests[id].data.started = true;
                        that.GI.socket.emit("Quest", {
                            operation: "active",
                            quest: id
                        });
                        that.GI.start();
                        $('#popup').foundation('reveal', 'close');
                    }

                });
            } else {
                console.log("remove");
                $('#' + id + '_description').remove();
                that.GI.quests[id].clicked = false;
            }

        });
    }
};
