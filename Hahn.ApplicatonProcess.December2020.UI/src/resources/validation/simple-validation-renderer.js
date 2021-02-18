var SimpleValidationRenderer = (function () {
    function SimpleValidationRenderer() {
    }
    SimpleValidationRenderer.prototype.render = function (instruction) {
        for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
            var _b = _a[_i], result = _b.result, elements = _b.elements;
            elements.forEach(function (target) { return target.parentElement.querySelector(".error").textContent = ""; });
        }
        var _loop_1 = function (result, elements) {
            elements.forEach(function (target) { return target.parentElement.querySelector(".error").textContent = result.message; });
        };
        for (var _c = 0, _d = instruction.render; _c < _d.length; _c++) {
            var _e = _d[_c], result = _e.result, elements = _e.elements;
            _loop_1(result, elements);
        }
    };
    return SimpleValidationRenderer;
}());
export { SimpleValidationRenderer };
//# sourceMappingURL=simple-validation-renderer.js.map