function solve() {
    const departButton = $("#depart");
    const arriveButton = $("#arrive");

    const infoSpan = $("span.info");

    let nextStop = "depot";
    let currentStop;

    return {
        depart() {
            departButton.prop("disabled", true);

            $.ajax(`https://judgetests.firebaseio.com/schedule/${nextStop}.json`, {
                complete: function (response) {
                    const responseObject = response.responseJSON;

                    currentStop = responseObject.name;

                    infoSpan.text(`Next stop ${currentStop}`);
                    nextStop = responseObject.next;
                }
            });

            arriveButton.prop("disabled", false);
        },
        arrive() {
            arriveButton.prop("disabled", true);

            infoSpan.text(`Arriving at ${currentStop}`);

            departButton.prop("disabled", false);
        }
    };
}

let result;

$(function() {
    result = solve();
});