const signinForm = document.getElementById("signin-form");

signinForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(signinForm);
    const signinData = Object.fromEntries(formData);

    fetch("/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
        credentials: "include",
    })
        .then((response) => {
            // Handle successful signin (display message, redirect, etc.)
            console.log("signin successful:", response);
            const alertMessage = document.createElement("div");
            const signinResult = document.getElementById("signin-result");

            if (response.status === 200) {
                alertMessage.className = "alert alert-success";
                alertMessage.textContent = "Signin successful!";
                signinResult.appendChild(alertMessage);
            }
        })
        .catch((error) => {
            // Handle errors (display error message)
            console.error("signin error:", error);
        });
});
