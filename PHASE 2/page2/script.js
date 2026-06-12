async function loadUser() {
    try {
        let res = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );

        let user = await res.json();

        document.getElementById("name").textContent =
            "Name: " + user.name;

        document.getElementById("email").textContent =
            "Email: " + user.email;

    } catch (err) {
        console.log("Error:", err);

        document.getElementById("name").textContent =
            "Failed to load user data";
    }
}

loadUser();