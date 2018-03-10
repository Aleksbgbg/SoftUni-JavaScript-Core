function elemelons() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }

            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        get element() {
            const string = this.constructor.name.slice(0, this.constructor.name.length - 5);
            return string;
        }

        toString() {
            return `Element: ${this.element}
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
        constructor(weight, melonSort) {
            super(weight, melonSort);

            this.morphIndex = -1;
            this.morph();
        }

        get nextMorphInstance() {
            return ["Water", "Fire", "Earth", "Air"][++this.morphIndex % 4];
        }

        get element() {
            return this._element;
        }

        morph() {
            this._element = this.nextMorphInstance;
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

const morpher = new Melolemonmelon(12.5, "Ghost");
for (let iteration = 0; iteration < 10; iteration++) {
    morpher.morph();

    console.log(morpher.toString());
}