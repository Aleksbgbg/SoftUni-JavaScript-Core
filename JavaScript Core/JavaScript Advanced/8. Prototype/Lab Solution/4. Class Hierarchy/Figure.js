class Figure {
    constructor() {
        if (new.target === Figure) {
            throw new TypeError("Abstract class 'Figure' cannot be instantiated.");
        }
    }
}

module.exports = {
    Figure
};