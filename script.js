const form = document.getElementById("supportForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const requestData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        category: document.getElementById("category").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value
    };

    try {
        const response = await fetch(
            "http://localhost:3000/submit-request",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Submission failed");
        }

        message.textContent =
            "Request submitted successfully! Request ID: " + result.id;

        message.style.color = "green";
        form.reset();

    } catch (error) {
        message.textContent = "Error: " + error.message;
        message.style.color = "red";
    }
});