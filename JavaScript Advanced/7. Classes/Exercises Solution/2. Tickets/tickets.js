function tickets(ticketDescriptions, sortingCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }

        static compare(first, second, criteria) {
            return first[criteria].localeCompare(second[criteria]);
        }

        compareTo(other, criteria) {
            return Ticket.compare(this, other, criteria);
        }
    }

    return ticketDescriptions
        .map(ticketDescription => new Ticket(...ticketDescription.split("|")))
        .sort((first, second) => first.compareTo(second, sortingCriteria));
}

console.log(tickets(["Philadelphia|94.20|available",
        "New York City|95.99|available",
        "New York City|95.99|sold",
        "Boston|126.20|departed"],
    "destination"));
console.log(tickets(["Philadelphia|94.20|available",
        "New York City|95.99|available",
        "New York City|95.99|sold",
        "Boston|126.20|departed"],
    "status"));