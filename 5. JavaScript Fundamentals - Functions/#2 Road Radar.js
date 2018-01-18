function roadRadar([speed, zone]) {
    const limits = {
        "motorway": 130,
        "interstate" : 90,
        "city": 50,
        "residential": 20
    }

    const speedLimitDifference = speed - limits[zone];

    if (speedLimitDifference >= 40) {
        console.log("reckless driving");
    } else if (speedLimitDifference >= 20) {
        console.log("excessive speeding");
    } else if (speedLimitDifference > 0) {
        console.log("speeding");
    }
}

roadRadar([40, "city"]);
roadRadar([21, "residential"]);
roadRadar([120, "interstate"]);
roadRadar([200, "motorway"]);