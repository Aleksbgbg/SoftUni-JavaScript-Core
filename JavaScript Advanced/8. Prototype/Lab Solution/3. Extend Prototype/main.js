function extendPrototype(inputClass, species) {
    inputClass.prototype.species = species;
    inputClass.prototype.toSpeciesString = function() {
        return `I am a ${this.species}. ${this.toString()}`;
    }
}

// Debug testing

class Random {
    toString() {
        return "Random class.";
    }
}

const random = new Random();

extendPrototype(Random, "Random");

console.log(random.toSpeciesString());