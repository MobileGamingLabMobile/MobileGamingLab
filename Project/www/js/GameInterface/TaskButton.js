var TaskButton = function (properties) {
    var _class = 'button round';
    if (properties.align) {
        _class += ' ' + properties.align;
    }

    this.$button = $('<a/>', {
        'class': _class,
        'id': 'taskButton',
        'text': properties.text
    });
};

TaskButton.prototype = new Button;

TaskButton.prototype.addEvent = function () {
    $('#taskButton').on('click', function () {
        $('#popup').foundation('reveal', 'open');

        $('#popupcontent').html('<p>Hier werden die Tasks stehen</p>');

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};



