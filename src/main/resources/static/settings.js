const user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    window.location.href = "login.html";
}

// preload values
document.getElementById("name").value = user.name;
document.getElementById("limit").value = user.monthlyLimit;

function updateProfile() {

    fetch(`http://localhost:9090/api/auth/update/${user.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            monthlyLimit: parseFloat(document.getElementById("limit").value)
        })
    })
    .then(res => res.json())
    .then(updatedUser => {
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
        alert("Profile Updated Successfully!");
    });
}