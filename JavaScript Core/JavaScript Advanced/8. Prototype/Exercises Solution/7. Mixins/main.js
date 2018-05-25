function mixins() {
    function computerQualityMixin(classToExtend) {
        function getQuality() {
            return (this.processorSpeed + this.ram + this .hardDiskSpace) / 3;
        }

        function isFast() {
            return this.processorSpeed > (this.ram / 4);
        }

        function isRoomy() {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed)
        }

        for (const attachFunction of [getQuality, isFast, isRoomy]) {
            classToExtend.prototype[attachFunction.name] = attachFunction;
        }
    }

    function styleMixin(classToExtend) {
        function isFullSet() {
            return this.manufacturer === this.keyboard.manufacturer &&
                this.keyboard.manufacturer === this.monitor.manufacturer;
        }

        function isClassy() {
            return this.battery.expectedLife >= 3 &&
                  (this.colour === "Silver" || this.colour === "Black") &&
                   this.weight < 3;
        }

        for (const attachFunction of [isFullSet, isClassy]) {
            classToExtend.prototype[attachFunction.name] = attachFunction;
        }
    }

    return {
        computerQualityMixin,
        styleMixin
    };
}

const {
    Keyboard,
    Monitor,
    Battery,
    Computer,
    Laptop,
    Desktop
} = require("../6. Computer/main.js").computer();

const {
    computerQualityMixin,
    styleMixin
} = mixins();

const computer = new Desktop("abc", 1, 1, 1, new Keyboard("abc", 12), new Monitor("abc", 10, 10));

styleMixin(Computer);

console.log(computer.isFullSet());