const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

window.onload = async () => {
    console.log(username);
    console.log(token);
}