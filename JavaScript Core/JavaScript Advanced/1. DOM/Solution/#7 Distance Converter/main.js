function attachEventListeners() {
    const meterInterchangeRates = {
        "km": 1000,
        "m": 1,
        "cm": 0.01,
        "mm": 0.001,
        "mi": 1609.34,
        "yrd": 0.9144,
        "ft": 0.3048,
        "in": 0.0254
    };

    document.getElementById("convert").addEventListener("click", event => {
        const input = Number(document.getElementById("inputDistance").value);
        const inputUnit = document.getElementById("inputUnits").value;

        const inputMeters = input * meterInterchangeRates[inputUnit];
        console.log(inputMeters);
        document.getElementById("outputDistance").value = inputMeters / meterInterchangeRates[document.getElementById("outputUnits").value];
    });
}