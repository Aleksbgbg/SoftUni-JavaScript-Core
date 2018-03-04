function getModule() {
    let elementFirst;
    let elementSecond;
    let elementResult;

    function init(selector1, selector2, resultSelector) {
        elementFirst = $(selector1);
        elementSecond = $(selector2);
        elementResult = $(resultSelector);
    }

    function add() {
        elementResult.val(Number(elementFirst.val()) + Number(elementSecond.val()));
    }

    function subtract() {
        elementResult.val(elementSecond.val() - elementFirst.val());
    }

    return {
        init,
        add,
        subtract
    }
}

$(function() {
    const module = getModule();

    module.init("#num1", "#num2", "#result");

    $("#sumButton").click(module.add);
    $("#subtractButton").click(module.subtract);
});