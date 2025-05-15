document.addEventListener("DOMContentLoaded", () => {
    const browseButtons = document.querySelectorAll(".browse-btn");
    const buyButtons = document.querySelectorAll(".buy-btn");

    /* browseButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const category = event.target.closest(".product-card").querySelector("h2").innerText;
            alert(`Browsing products in category: ${category}`);
        });
    }); */

    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Item added to cart!");
        });
    });
    
    // Toggle between Login and Signup forms
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const showSignup = document.getElementById("show-signup");
    const showLogin = document.getElementById("show-login");

    showSignup.addEventListener("click", () => {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });

    showLogin.addEventListener("click", () => {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Handle Signup
    document.getElementById("signup").addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch("signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data.includes("Signup successful")) {
                signupSection.style.display = "none";
                loginSection.style.display = "block";
            }
        })
        .catch(error => console.error("Error:", error));
    });
});

    // Handle Login
    document.getElementById("login").addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                alert("Login successful!");
                window.location.href = "index.html";
            } else {
                alert(data);
            }
        })
        .catch(error => console.error("Error:", error));
    });

