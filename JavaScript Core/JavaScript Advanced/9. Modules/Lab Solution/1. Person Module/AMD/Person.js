define([], function() {
    class Person {
        constructor(name) {
            this.name = name;
        }

        toString() {
            return `I'm ${name}`;
        }
    }

    return {
        Person
    };
});