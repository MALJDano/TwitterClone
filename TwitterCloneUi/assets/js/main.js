const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

console.log(username);  
console.log(token);

window.onload = async () => {
    await displayPosts();
    await displayAccounts();
}

async function displayPosts() {
    const posts = await getPosts();

    const tweetList = document.getElementById("tweet-list");

    // Clear existing content in the tweet list
    tweetList.innerHTML = "";

    posts.reverse();
    // Iterate over each post and create HTML elements to display them
    posts.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `
        <b>${post.postedBy}</b><br>
        @${post.postedBy}<br><br>


            ${post.content}<br><br>
            
            <strong>Total Likes:</strong> ${post.likes.length} <br>
             ${new Date(post.dateTimePosted).toLocaleString()}<br>
            <button class="like-button" onclick="likePost('${post.postId}')">
            <span>&#10084;</span>   Like</button><br>


            <hr>
        `;  
        const profilePicture = document.createElement('img');
        profilePicture.src = 'https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png';
        profilePicture.alt = 'Profile Picture';
        profilePicture.classList.add('post__profilePicture');
        profilePicture.style.width = '50px'; 
        profilePicture.style.height = '50px';
        tweetList.appendChild(profilePicture);
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
    document.getElementById("tweet-text").value = "";


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

            await displayPosts();
        } else {
            alert("Failed to create post. Please try again.");
        }
    } catch (error) {
        console.error("Error creating post:", error);
        alert("An error occurred while creating post. Please try again later.");
    }
}


async function likePost(postId) {
    // Check if the post is already liked by the user
    const posts = await getPosts();
    const likedPost = posts.find(post => post.postId === postId && post.likes.includes(username));
    
    let requestOptions;
    if (likedPost) {
        // Unlike the post if it's already liked
        requestOptions = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "action": "unlike"
            })
        };
    } else {
        // Like the post if it's not already liked
        requestOptions = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "action": "like"
            })
        };
    }

    try {
        const response = await fetch(`/api/v1/posts/${postId}`, requestOptions);
        if (response.ok) {
            // Refresh the post list after successful like/unlike
            await displayPosts();
        } else {
            alert("Failed to like/unlike post. Please try again.");
        }
    } catch (error) {
        console.error("Error liking/unliking post:", error);
        alert("An error occurred while liking/unliking post. Please try again later.");
    }
}
async function displayAccounts() {
    const users = await getUsers();
    const followList = document.getElementById("follow-list");

    // Clear existing content in the follow list
    followList.innerHTML = "";

    // Iterate over each user and create HTML elements to display them
    users.forEach(user => {
        // Check if the user is not the logged-in user
        if (user !== username) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${user}</span>
                <button onclick="followUser('${user}')">Follow</button>
                <button onclick="unfollowUser('${user}')">Unfollow</button>
            `;
            followList.appendChild(li);
        }
    });
}

async function getUsers() {
    const response = await fetch("/api/v1/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const users = await response.json();
    return users;
}

async function followUser(followingUsername) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`/api/v1/users/${username}/following/${followingUsername}`, requestOptions);
        if (response.ok) {
            // Refresh the page after successful follow
            location.reload();
        } else {
            alert("Failed to follow user. Please try again.");
        }
    } catch (error) {
        console.error("Error following user:", error);
        alert("An error occurred while following user. Please try again later.");
    }
}

async function unfollowUser(followingUsername) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`/api/v1/users/${username}/following/${followingUsername}`, requestOptions);
        if (response.ok) {
            // Refresh the page after successful unfollow
            location.reload();
        } else {
            alert("Failed to unfollow user. Please try again.");
        }
    } catch (error) {
        console.error("Error unfollowing user:", error);
        alert("An error occurred while unfollowing user. Please try again later.");
    }
}
