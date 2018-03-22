function loadCommits() {
    const ulCommits = $("#commits");

    $
        .get(`https://api.github.com/repos/${$("#username").val()}/${$("#repo").val()}/commits`)
        .then(function(response) {
            ulCommits.empty();

            for (const commit of response.map(object => object.commit)) {
                ulCommits.append(`<li>${commit.author.name}: ${commit.message}</li>`);
            }
        })
        .catch(function(error) {
            ulCommits.empty();

            ulCommits.append(`<li>Error: ${error.status} (${error.statusText})</li>`);
        });
}