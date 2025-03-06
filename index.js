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

        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Store user data (temporary, not secure)
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        alert("Signup successful! You can now log in.");
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Handle Login
    document.getElementById("login").addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to home page
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });

});
