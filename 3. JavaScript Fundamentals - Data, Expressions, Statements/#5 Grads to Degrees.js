function gradsToDegrees(grads) {
    const value = grads / 100 * 90 % 360;
    console.log(value < 0 ? 360 + value : value);
}

gradsToDegrees(100);
gradsToDegrees(400);
gradsToDegrees(850);
gradsToDegrees(-50);