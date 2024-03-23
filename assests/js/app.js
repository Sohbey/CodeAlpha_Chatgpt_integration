document.addEventListener("DOMContentLoaded", function (e) {
  let chatLog = document.getElementById("chat-log");
  let scrollPosition = 0;
  let sendBtn = document.getElementById("send-btn");
  let userInput = document.querySelector(".user-input");
  let apiKey = "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";
  let apiURL = "https://api.openai.com/v1/chat/completions";

  sendBtn.addEventListener("click", async () => {
    let userMessage = userInput.value.trim();
    if (userMessage !== "") {
      if (!checkInternetConnection()) {
        displayMessage(
          "error",
          "Sorry, you are offline. Please check your internet connection."
        );
        return;
      }
      if (userMessage.startsWith("/")) {
        userInput.value = "";
      } else {
        if (apiKey) {
          try {
            displayMessage("sent", userMessage);
            let response = await sendChatMessage(userMessage);
            if (response) {
              displayMessage("received", response);
              scrollChatLog();
            }
          } catch (error) {
            console.error(error);
            displayMessage(
              "error",
              "Error,Failed to fetch response from the API."
            );
          }
          userInput.value = "";
        } else {
          displayMessage(
            "error",
            "No API key is provided, unable to send message"
          );
          userInput.value = "";
        }
      }
    }
  });

  async function sendChatMessage(message){
    
   
  }

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

  function showLoadingIndicator() {
    document.getElementById("loading-indicator").style.display = "flex";
  }

  function hideLoadingIndicator() {
    document.getElementById("loading-indicator").style.display = "none";
  }

  function scrollChatLog() {
    let isScrolledToBottom =
      chatLog.scrollHeight - chatLog.clientHeight <= chatLog.scrollTop + 1;

    chatLog.scrollTop = chatLog.scrollHeight;
    if (isScrolledToBottom) {
      restoreScrollPosition();
    }
  }

  function restoreScrollPosition() {
    chatLog.scrollTop = scrollPosition;
  }
});
