var Label = function (properties) {
    var _class = 'label';
    if (properties.align) {
        _class += ' ' + properties.align;
    }
    
    this.$label = $('<span/>', {
        class: _class,
        id: properties.id,
        text: properties.text
    });
}

Label.prototype.appendTo = function (ele) {
    this.$label.appendTo(ele);
};

