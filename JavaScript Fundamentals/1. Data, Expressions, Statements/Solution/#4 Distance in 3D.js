function distance3d([x1, y1, z1, x2, y2, z2]) {
    console.log(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2));
}

distance3d([1, 1, 0, 5, 4, 0]);
distance3d([3.5, 0, 1, 0, 2, -1]);