var Popup = function () {
};

Popup.prototype.close = function () {
    $('#popup').foundation('reveal', 'close');
};

Popup.prototype.open = function () {
    $('#popup').foundation('reveal', 'open');

    $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
        $('#popupcontent').html('');
    });
};

Popup.prototype.clear = function () {
    $('#popupcontent').html('');
};

Popup.prototype.selectRole = function (data) {
    var that = this;
    $('#popupcontent').append("Bitte w&auml;hle eine Rolle aus:<br><br>");
    $.each(data, function (index) {
        var role = data[index];
        var $button = $('<a/>', {
            'class': 'button',
            'id': role.id,
            'text': role.name
        });

        $('#popupcontent').append($button);
        $button.on('click', function () {
            $(that).trigger("role_selected", [role._id]);
            that.close();
        });

    });
};

Popup.prototype.questEvent = function (data) {
    $('#popupcontent').append("<div>" + data.title + "</div>");
    $('#popupcontent').append(data.sequences.html);
};
