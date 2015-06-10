var Button = function () {
    this.id = 'id';
    this.$button = $('<a/>', {
        'class': 'button',
        'id': 'id',
        'text': 'text'
    });
};

Button.prototype.appendTo = function (ele) {
    this.$button.appendTo(ele);
    this.addEvent();
};

Button.prototype.addEvent = function () {
    $('#' + this.id).on('click', function () {
        $('#popup').foundation('reveal', 'open');
    });
};

