var ObjectValuesValueConverter = (function () {
    function ObjectValuesValueConverter() {
    }
    ObjectValuesValueConverter.prototype.toView = function (obj) {
        var temp = [];
        for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
            var val = obj_1[_i];
            temp.push(val);
        }
        return temp;
    };
    return ObjectValuesValueConverter;
}());
export { ObjectValuesValueConverter };
//# sourceMappingURL=object-values.js.map