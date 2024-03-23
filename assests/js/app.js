document.addEventListener("DOMContentLoaded", function (e) {
  let chatLog = document.getElementById("chat-log");

  function displayMessage(type, message) {
    let messageContainer = document.createElement("div");
    messageContainer.classList.add("message", type);
    let messageText = document.createElement("p");
    messageText.textContent = message;
    messageContainer.appendChild(messageText);
    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function checkInternetConnection() {
    return navigator.onLine;
  }
  
});
