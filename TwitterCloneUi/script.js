let userToken;
let tweets = [];

function renderUser() {
    document.getElementById('user-info').innerHTML = `
        <p>Username: joblipat</p>
        <p>Followers: 100</p>
        <p>Following: 50</p>
    `;
}

function renderTweets() {
    const tweetListElement = document.getElementById('tweet-list');
    tweetListElement.innerHTML = "";
    tweets.forEach(tweet => {
        const li = document.createElement('li');
        li.textContent = `${tweet.username}: ${tweet.text} (${tweet.likes} likes)`;
        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.onclick = () => likeTweet(tweet.id);
        li.appendChild(likeButton);
        tweetListElement.appendChild(li);
    });
}

function postTweet() {
    const tweetText = document.getElementById('tweet-text').value;
    const newTweet = {
        id: tweets.length + 1,
        username: "joblipat",
        text: tweetText,
        likes: 0,
    };
    tweets.unshift(newTweet);
    renderTweets();
}

function likeTweet(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    if (tweet) {
        tweet.likes++;
        renderTweets();
    }
}

function start() {
    renderUser();
    // Simulating initial tweets
    tweets = [
        { id: 1, username: 'user1', text: 'This is a tweet!', likes: 5 },
        { id: 2, username: 'user2', text: 'Another tweet!', likes: 10 },
    ];
    renderTweets();
}

start();


