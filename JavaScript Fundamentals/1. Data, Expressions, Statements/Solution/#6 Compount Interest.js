function compoundInterest([principalSum, interestRate, compoundingPeriod, years]) {
    const nominalInterestRate = interestRate / 100;
    const compoundingFrequency = compoundingPeriod / 12;

    console.log(principalSum * ((1 + nominalInterestRate / compoundingFrequency) ** (compoundingFrequency * years)));
}

compoundInterest([1500, 4.3, 3, 6]);
compoundInterest([100000, 5, 12, 25]);