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
        $('#popup').foundation('reveal', 'open');

        $('#popupcontent').html('<p>Hier werden die Tasks stehen</p>');
        
        that.GI.body.map.addMarker(51.96505, 7.6125);
        
        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};



