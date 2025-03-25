const API_URL = "http://127.0.0.1:5000/get_response"; // Flask backend URL

async function sendMessage() {
    let input = document.getElementById("chatInput");
    let message = input.value.trim();
    if (message === "") return;

    // Display user message
    appendMessage("You", message, "user");

    // Send request to Flask backend
    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: message })
        });

        let data = await response.json();
        let botMessage = data.response || "No response from AI.";

        // Display AI response
        appendMessage("CodeAssist", botMessage, "bot");

    } catch (error) {
        console.error("Error:", error);
        appendMessage("CodeAssist", "Error communicating with the server.", "bot");
    }

    input.value = "";
}

function appendMessage(sender, message, type) {
    let chatBox = document.getElementById("chatBox");
    let newMessage = document.createElement("div");
    newMessage.className = type === "user" ? "chat-message user" : "chat-message bot";
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}
