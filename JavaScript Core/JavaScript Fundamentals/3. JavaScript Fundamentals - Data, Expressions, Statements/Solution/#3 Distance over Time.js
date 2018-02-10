function distanceOverTime([v1, v2, t]) {
    const d1 = v1 * 1000 / 60 / 60 * t;
    const d2 = v2 * 1000 / 60 / 60 * t;

    console.log(Math.abs(d1 - d2));
}

distanceOverTime([0, 60, 3600]);
distanceOverTime([11, 10, 120]);
distanceOverTime([5, -5, 40]);