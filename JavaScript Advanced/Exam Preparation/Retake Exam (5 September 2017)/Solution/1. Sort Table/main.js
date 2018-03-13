function sort(colIndex, descending) {
    function getSortingModifier() {
        if (descending) {
            return function(sortedValue) {
                return -sortedValue;
            }
        }

        return function(sortedValue) {
            return sortedValue;
        }
    }

    function getComparer() {
        if (colIndex === 0) {
            return function(first, second) {
                return first.localeCompare(second);
            }
        }

        return function(first, second) {
            return first - second;
        };
    }

    function getParser() {
        if (colIndex === 0) {
            return function(object) {
                return object.children().first().text();
            }
        }

        return function(object) {
            return Number(object.children().eq(1).text());
        }
    }

    const sortingModifier = getSortingModifier();
    const comparer = getComparer();
    const parse = getParser();

    const rows = $("tbody tr");

    rows.sort((first, second) => sortingModifier(comparer(parse($(first)), parse($(second)))));

    const table = $("table");

    for (const row of rows) {
        table.append(row);
    }
}