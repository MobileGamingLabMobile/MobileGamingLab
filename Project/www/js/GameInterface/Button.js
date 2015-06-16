var Button = function (GI) {
    this.id = 'id';
    this.GI = GI;
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

Button.prototype.css = function (property, value) {
    this.$button.css(property, value);
}

Button.prototype.addEvent = function () {
    $('#' + this.id).on('click', function () {
        $('#popup').foundation('reveal', 'open');
    });
};

