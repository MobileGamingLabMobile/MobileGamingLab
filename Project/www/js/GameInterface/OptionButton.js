var OptionButton = function (properties) {
    var _class = 'button round';
    if (properties.align) {
        _class += ' ' + properties.align;
    }

    this.$button = $('<a/>', {
        'class': _class,
        'id': 'optionButton',
        'text': properties.text
    });
};

OptionButton.prototype = new Button;

OptionButton.prototype.addEvent = function () {
    $('#optionButton').on('click', function () {
        $('#popup').foundation('reveal', 'open');

        $('#popupcontent').html('<p>Hier werden die Optionen stehen</p>');

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};



