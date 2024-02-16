const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

console.log(username);  
console.log(token);

window.onload = async () => {
    await displayPosts();
}

async function displayPosts() {
    const posts = await getPosts();
    const tweetList = document.getElementById("tweet-list");

    // Clear existing content in the tweet list
    tweetList.innerHTML = "";

    // Iterate over each post and create HTML elements to display them
    posts.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Posted by:</strong> ${post.postedBy}<br>
            <strong>Content:</strong> ${post.content}<br>
            <strong>Date and Time Posted:</strong> ${new Date(post.dateTimePosted).toLocaleString()}<br>
            <strong>Total Likes:</strong> ${post.likes.length}<br>
            <hr>
        `;
        tweetList.appendChild(li);
    });
}

async function getPosts() {
    const response = await fetch("/api/v1/posts", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const posts = await response.json();
    return posts;
}

async function createPost() {
    const tweetText = document.getElementById('tweet-text').value;

    const raw = JSON.stringify({
        "content": tweetText
    });

    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: raw,
    };

    try {
        const response = await fetch("/api/v1/posts", requestOptions);
        if (response.ok) {
            alert("Post created successfully!");
            // Refresh the post list after successful creation
            await displayPosts();
        } else {
            alert("Failed to create post. Please try again.");
        }
    } catch (error) {
        console.error("Error creating post:", error);
        alert("An error occurred while creating post. Please try again later.");
    }
}