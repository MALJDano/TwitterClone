async function helloWorld() {
    const res = await fetch("/api")
    const text = await res.text()
    console.log(text);
}

async function register() {
    const registerUsername = document.getElementById('register-username').value;
    const registerPassword = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if password and confirm password match
    if (registerPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        document.getElementById('register-password').value = '';
        document.getElementById('confirm-password').value = '';
        return;
    }

    const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: registerUsername,
            password: registerPassword
        })
    });

    // Check if registration was successful
    if (res.ok) {
        alert("Registration successful!");
        // Clear input fields after successful registration
        document.getElementById('register-username').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('confirm-password').value = '';
    } else {
        alert("Registration failed. Please try again.");
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    if (res.ok) { // Check if response status is in the 200 range (success)
        const token = await res.text();
        console.log(token);

        // Store the token in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        // Redirect to index.html
        window.location.href = "index.html";

        return token; // Return the token
    } else if (res.status === 401) { // Unauthorized access
        alert('Login failed. Please check your username and password.');
    } else { // Other errors
        alert('An error occurred while logging in. Please try again later.');
    }
}

async function start() {
    await helloWorld()
}

start()