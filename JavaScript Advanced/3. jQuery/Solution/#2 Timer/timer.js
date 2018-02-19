(() => {
    Number.prototype.pad = function(digits) {
        let string = String(this);

        while (string.length < digits) {
            string = "0" + string;
        }

        return string;
    };
})();

function timer() {
    {
        const hours = $("#hours");
        const minutes = $("#minutes");
        const seconds = $("#seconds");

        let currentTime = 0;

        function runTimer() {
            ++currentTime;

            const timeMinutes = Math.floor(currentTime / 60);

            hours.text(Math.floor(timeMinutes / 60).pad(2));
            minutes.text((timeMinutes % 60).pad(2));
            seconds.text((currentTime % 60).pad(2));
        }
    }

    const startTimerButton = $("#start-timer");
    const stopTimerButton = $("#stop-timer");

    let timer;

    startTimerButton.click(() => {
        startTimerButton.attr("disabled", true);
        timer = setInterval(runTimer, 1);
        stopTimerButton.removeAttr("disabled");
    });

    stopTimerButton.click(() => {
        stopTimerButton.attr("disabled", true);
        clearInterval(timer);
        startTimerButton.removeAttr("disabled");
    });

    stopTimerButton.attr("disabled", true);
}