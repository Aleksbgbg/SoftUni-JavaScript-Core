function getInfo() {
    const stopId = $("#stopId").val();

    const stopNameDiv = $("#stopName");

    const busList = $("#buses");

    $
        .ajax(`https://judgetests.firebaseio.com/businfo/${stopId}.json`, {
            beforeSend: function() {
                busList.empty();
            },
            error: function() {
                stopNameDiv.text("Error");
            },
            success: function(response) {
                stopNameDiv.text(response.name);

                for (const bus in response.buses) {
                    busList.append($(`<li>Bus ${bus} arrives in ${response.buses[bus]} minutes</li>`));
                }
            }
        });
}