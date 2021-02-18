var ObjectValueValueConverter = (function () {
    function ObjectValueValueConverter() {
    }
    ObjectValueValueConverter.prototype.toView = function (obj) {
        var temp = [obj.length];
        for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
            var val = obj_1[_i];
            temp.push(val);
        }
        return temp;
    };
    ObjectValueValueConverter.prototype.fromView = function (value) {
    };
    return ObjectValueValueConverter;
}());
export { ObjectValueValueConverter };
//# sourceMappingURL=object-value.js.map