function attachEvents() {
    const messagesTextarea = $("#messages");
    const authorInput = $("#author");
    const contentInput = $("#content");

    function refresh() {
        $.ajax("https://messenger-cd263.firebaseio.com/-L8C5lLEj9b0_rrXs1QB.json", {
            complete: function(response) {
                const messages = Object.values(response.responseJSON);

                messagesTextarea.text(messages
                    .sort((first, second) => first.timestamp - second.timestamp)
                    .map(message => `${message.author}: ${message.content}`)
                    .join("\n")
                );
            }
        });
    }

    $("#submit").click(function() {
        $.ajax("https://messenger-cd263.firebaseio.com/-L8C5lLEj9b0_rrXs1QB.json", {
            complete: refresh,
            data: JSON.stringify({
                author: authorInput.val(),
                content: contentInput.val(),
                timestamp: new Date().getTime()
            }),
            method: "POST"
        });
    });

    $("#refresh").click(refresh);
}

$(attachEvents);