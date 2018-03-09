function elemelons() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class 'Melon' cannot be directly instantiated.");
            }

            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        toString() {
            return `Element: ${this.constructor.name.slice(0, this.constructor.name.length - 5)}
Sort: ${this.melonSort}
Element Index: ${this.elementIndex}`;
        }
    }

    class Watermelon extends Melon {
    }

    class Firemelon extends Melon {
    }

    class Earthmelon extends Melon {
    }

    class Airmelon extends Melon {
    }

    class Melolemonmelon extends Firemelon {
        constructor() {
            super(0, "Melonmelon");

            this.morphIndex = -1;
            this.morph();
        }

        get nextMorphInstance() {
            return new [Watermelon, Firemelon, Earthmelon, Airmelon][++this.morphIndex % 4]();
        }

        morph() {
            this.element = this.nextMorphInstance;
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    };
}

const {
    Melon,
    Watermelon,
    Firemelon,
    Earthmelon,
    Airmelon,
    Melolemonmelon
} = elemelons();

try {
    const test = new Melon(100, "Test");
} catch (error) {
    console.log(error);
}

const watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());
// Element: Water
// Sort: Kingsize
// Element Index: 100

const morpher = new Melolemonmelon();
for (let iteration = 0; iteration < 10; iteration++) {
    morpher.morph();
    console.log(morpher.toString());
}