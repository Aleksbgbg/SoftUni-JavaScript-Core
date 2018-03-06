class Rat {
    constructor(name) {
        this.name = name;

        this.unitedRats = [];
    }

    unite(otherRat) {
        this.unitedRats.push(otherRat);
    }

    getRats() {
        return this.unitedRats;
    }

    toString() {
        return [`${this.name}`]
            .concat(this.unitedRats.map(rat => `##${rat.name}`))
            .join("\n");
    }
}

const test = new Rat("Pesho");

console.log(test.toString()); // Pesho
console.log(test.getRats()); // []

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));

console.log(test.getRats());
// [ Rat { name: 'Gosho', unitedRats: [] },
// Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
// Pesho
// ##Gosho
// ##Sasho