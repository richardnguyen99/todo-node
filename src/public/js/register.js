const registrationForm = document.getElementById("registration-form");

console.log("registrationForm", registrationForm);

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(registrationForm);
    const registrationData = Object.fromEntries(formData);

    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
    })
        .then((response) => {
            // Handle successful registration (display message, redirect, etc.)
            console.log("Registration successful:", response);
        })
        .catch((error) => {
            // Handle errors (display error message)
            console.error("Registration error:", error);
        });
});
