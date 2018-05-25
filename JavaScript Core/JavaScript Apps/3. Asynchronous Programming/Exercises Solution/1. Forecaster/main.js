$(function() {
    function getRequest(url) {
        return $.get(`https://judgetests.firebaseio.com/${url}`);
    }

    const weatherSymbols = {
        "Sunny": "&#x2600",
        "Partly sunny": "&#x26C5",
        "Overcast": "&#x2601",
        "Rain": "&#x2614"
    };

    class ForecastManager {
        constructor(managementElements) {
            this.managementElements = managementElements;
        }

        static make(divUpcomingForecast) {
            const spanWrapper = $("<span class='upcoming'>");

            const spanSymbol = $("<span class='symbol'>");
            const spanTemperature = $("<span class='forecast-data'>");
            const spanCondition = $("<span class='forecast-data'>");

            for (const span of [spanSymbol, spanTemperature, spanCondition]) {
                spanWrapper.append(span);
            }

            divUpcomingForecast.append(spanWrapper);

            return new ForecastManager({
                "symbol": spanSymbol,
                "temperature": spanTemperature,
                "condition": spanCondition
            });
        }

        update(forecastData) {
            const elementData = {
                "name": () => forecastData.name,
                "symbol": () => weatherSymbols[forecastData.forecast.condition],
                "temperature": () => `${forecastData.forecast.low}&#176/${forecastData.forecast.high}&#176`,
                "condition": () => forecastData.forecast.condition
            };

            for (const elementType in elementData) {
                if (this.managementElements.hasOwnProperty(elementType)) {
                    this.managementElements[elementType].html(elementData[elementType]);
                }
            }
        }
    }

    class CurrentForecastManager extends ForecastManager {
        static make(divCurrentConditions) {
            const spanName = $("<span class='forecast-data'>");
            const spanSymbol = $("<span class='condition symbol'>");
            const spanTemperature = $("<span class='forecast-data'>");
            const spanCondition = $("<span class='forecast-data'>");

            divCurrentConditions
                .append(spanSymbol)
                .append(
                    $("<span class='condition'>")
                        .append(spanName)
                        .append(spanTemperature)
                        .append(spanCondition)
                );

            return new CurrentForecastManager({
                "name": spanName,
                "symbol": spanSymbol,
                "temperature": spanTemperature,
                "condition": spanCondition
            });
        }
    }

    const currentConditionProcessor = (function() {
        const currentForecastManager = CurrentForecastManager.make($("#current"));

        return function(forecast) {
            currentForecastManager.update(forecast);
        };
    })();

    const forecastProcessor = (function() {
        const divUpcoming = $("#upcoming");

        const forecastManagers = [];

        for (let iteration = 0; iteration < 3; ++iteration) {
            forecastManagers.push(ForecastManager.make(divUpcoming));
        }

        return function(threeDayForecast) {
            const forecasts = threeDayForecast.forecast.map(forecast => ({
                name: forecast.name,
                forecast
            }));

            for (let index = 0; index < forecasts.length; index++) {
                forecastManagers[index].update(forecasts[index]);
            }
        };
    })();

    const divForecast = $("#forecast");
    const inputLocation = $("#location");

    $("#submit").click(function() {
        getRequest("locations.json").then(function(response) {
            function errorProcessor() {
                divForecast.text("Error!");
            }

            const locationTarget = inputLocation.val();

            if (["Barcelona", "New York", "London"].indexOf(locationTarget) === -1) {
                errorProcessor();
                return;
            }

            const location = response.filter(location => location.name === locationTarget)[0];

            Promise
                .all([
                    getRequest(`forecast/today/${location.code}.json`),
                    getRequest(`forecast/upcoming/${location.code}.json`)
                ])
                .then(function([currentConditions, threeDayForecast]) {
                    currentConditionProcessor(currentConditions);
                    forecastProcessor(threeDayForecast);
                })
                .catch(errorProcessor);
        });
    });

    divForecast.css("display", "");
});