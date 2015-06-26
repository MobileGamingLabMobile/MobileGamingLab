var TaskButton = function (properties, GI) {
    var _class = 'button round';
    if (properties.align) {
        _class += ' ' + properties.align;
    }
    
    this.GI = GI;

    this.$button = $('<a/>', {
        'class': _class,
        'id': 'taskButton',
        'text': properties.text
    });
};

TaskButton.prototype = new Button;

TaskButton.prototype.addEvent = function () {
    var that = this;
    $('#taskButton').on('click', function (e) {
		that.loadPopup();
        $('#popup').foundation('reveal', 'open');

  //      $('#popupcontent').html('<p>Hier werden die Tasks stehen</p>');
        
        that.GI.body.map.addMarker(51.96505, 7.6125);
        
        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};

TaskButton.prototype.loadPopup = function () {
	$("#popupcontent").html("<header><b>Aktuelle und abgeschlossene Aufgaben</b></header>");
	var that= this;
	var i = 0;
	for (quest in this.GI.quests) {
		if (i % 2) {
			var div = "<div style='background-color:#FeFeFe' id='" + that.GI.quests[quest].data.quest._id + "'></div>";
			$('#popupcontent').append(div);
			$("#" + quest).append("<div style='background-color:#FeFeFe'><h5>" + that.GI.quests[quest].data.quest.title + "</h5></div>");
		} else {
			var div = "<div style='background-color:#EEEEEE' id='" + that.GI.quests[quest].data.quest._id + "'></div>";
			$('#popupcontent').append(div);
			$("#" + quest).append("<div style='background-color:#EEEEEE'><h5>" + that.GI.quests[quest].data.quest.title + "</h5></div>");
		}
		
		$("#" + quest).on('click', function (e) {
			var id = this.id;
			if(!that.GI.quests[id].clicked) {
				var _div = "<div class='row' id='" + id + "_description'>";
				_div += "<div class='small-3 columns'><a id='" + id + "_start' class='button success'> Starten</a></div>";
				_div += "<div class='small-9 columns'>" + that.GI.quests[id].data.quest.description.html + '</div>';
				_div += "</div>";
				$('#' + id).append(_div);
				that.GI.quests[id].clicked = true;
				$('#' + id + '_start').on('click', function (e) {
					//Send server that the quest has been started
					$('#currentTaskLabel').text(that.GI.quests[id].data.quest.title);
					$('#popup').foundation('reveal', 'close');
				});
			} else {
				console.log("remove");
				$('#' + id + '_description').remove();
				that.GI.quests[id].clicked = false;
			}
			
		});
		
		i++;
	}
	
};
