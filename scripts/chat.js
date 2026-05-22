document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("chat-button");
  const widget = document.getElementById("chat-widget");
  const send = document.getElementById("chat-send");
  const messages = document.getElementById("chat-messages");
  let open = false;
  let chatResponses = [];
  fetch("chatResponses.json")
    .then(response => response.json())
    .then(data => {
      chatResponses = data;
    })
    .catch(error => {
      console.error("Failed to load chat responses:", error);
    });
  button.addEventListener("click", () => {
    open = !open;
    widget.classList.toggle("open", open);
  });
  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `message ${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }
  send.addEventListener("click", () => {
    addMessage("Starting Live Chat...", "user");
    setTimeout(() => {
      const randomResponse =
        chatResponses[Math.floor(Math.random() * chatResponses.length)] ||
        "No responses available.";
      addMessage(randomResponse, "bot");
    }, 250);
  });
});
