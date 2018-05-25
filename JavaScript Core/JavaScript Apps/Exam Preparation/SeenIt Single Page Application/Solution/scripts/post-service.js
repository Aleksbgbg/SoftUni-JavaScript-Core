const posts = (function() {
    function getAllPosts() {
        const endpoint = "posts?query={}&sort={\"_kmd.ect\": -1}";

        return requester.get("appdata", endpoint, "kinvey");
    }

    function createPost(author, title, description, url, imageUrl) {
        return requester.post("appdata", "posts", "kinvey", {
            author,
            title,
            description,
            url,
            imageUrl
        });
    }

    function editPost(postId, author, title, description, url, imageUrl) {
        return requester.update("appdata", `posts/${postId}`, "kinvey", {
            author,
            title,
            description,
            url,
            imageUrl
        });
    }

    function deletePost(postId) {
        return requester.remove("appdata", `posts/${postId}`, "kinvey");
    }

    function myPosts(username) {
        const endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`;

        return requester.get("appdata", endpoint, "kinvey")
    }

    function getPost(postId) {
        return requester.get("appdata", `posts/${postId}`, "kinvey");
    }

    return {
        getAllPosts,
        createPost,
        editPost,
        deletePost,
        myPosts,
        getPost
    };
})();