function treasureLocator(coordinates) {
    const islands = {
        "Cook" : [4, 7, 9, 8],
        "Samoa": [5, 3, 7, 6],
        "Tokelau": [8, 0, 9, 1],
        "Tonga": [0, 6, 2, 8],
        "Tuvalu": [1, 1, 3, 3]
    }

    function isInIsland(islandCoordinates, x, y) {
        const [islandLeft, islandTop, islandRight, islandBottom] = islandCoordinates;
        return islandLeft <= x && x <= islandRight && islandTop <= y && y <= islandBottom;
    }

    for (let index = 0; index < coordinates.length; index += 2) {
        const x = coordinates[index];
        const y = coordinates[index + 1];

        for (const island in islands) {
            if (isInIsland(islands[island], x, y)) {
                console.log(island);
                break;
            }

            if (island === "Tuvalu") {
                console.log("On the bottom of the ocean");
            }
        }
    }
}

treasureLocator([4, 2, 1.5, 6.5, 1, 3]);