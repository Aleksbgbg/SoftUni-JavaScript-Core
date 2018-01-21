function solveQuadratic(a, b, c) {
    const discriminant = b ** 2 - 4 * a * c;

    const solutionCount = discriminant > 0 ? 2 : discriminant == 0 ? 1 : 0;

    if (solutionCount == 0) {
        console.log("No");
        return;
    }

    const discSq = Math.sqrt(discriminant);

    const a2 = 2 * a;

    const firstSolution = (discSq - b) / a2;

    if (solutionCount == 1) {
        console.log(firstSolution);
        return;
    }

    const secondSolution = (-discSq - b) / a2;
    console.log(`${firstSolution} and ${secondSolution}`);
}

solveQuadratic(6, 11, -35);
solveQuadratic(1, -12, 36);
solveQuadratic(5, 2, 1);