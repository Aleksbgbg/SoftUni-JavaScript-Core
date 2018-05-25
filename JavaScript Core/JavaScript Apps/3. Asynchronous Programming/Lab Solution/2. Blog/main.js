function attachEvents() {
    const authorization = `Basic ${btoa("Gosho:pesho")}`;

    function createRequest(url) {
        return $.get({
            url: `https://baas.kinvey.com/appdata/kid_S1wrqcZcf/${url}`,
            headers: {
                authorization
            }
        });
    }

    const selectPosts = $("#posts");
    const headingPostTitle = $("#post-title");
    const ulPostBody = $("#post-body");
    const ulComments = $("#post-comments");

    $("#btnLoadPosts").click(function() {
        createRequest("posts").then(function (response) {
            for (const option of response) {
                selectPosts.append(`<option value="${option._id}">${option.title}</option>`);
            }
        });
    });

    $("#btnViewPost").click(function() {
        const postId = selectPosts.val();

        Promise
            .all([
                createRequest(`posts/${postId}`),
                createRequest(`comments/?query={"post_id":"${postId}"}`)
            ])
            .then(function([post, comments]) {
                headingPostTitle.text(post.title);
                ulPostBody.empty();
                ulPostBody.append(`<li>${post.body}</li>`);

                ulComments.empty();

                for (const comment of comments) {
                    ulComments.append(`<li>${comment.text}</li>`);
                }
            });
    });
}

$(attachEvents);