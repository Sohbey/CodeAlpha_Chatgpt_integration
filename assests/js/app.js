document.addEventListener("DOMContentLoaded", function (e) {
  let chatLog = document.getElementById("chat-log");
  let scrollPosition = 0;
  let sendBtn = document.getElementById("send-btn");
  let userInput = document.querySelector(".user-input");
  let apiKey = ""; // Set your API key here
  let apiURL = ""; // Set your API URL here

  let clearBtn = document.getElementById("clear-btn");

  clearBtn.addEventListener("click", function () {
    clearChatHistory();
    displayMessage(
      "received",
      "Welcome to Sohbey's Chatbot, How can I assist you today?"
    );
  });

  function clearChatHistory() {
    while (chatLog.firstChild) {
      chatLog.firstChild.remove();
    }
  }

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
              "Error: Failed to fetch response from the API."
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

  async function sendChatMessage(message) {
    let data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Welcome to Sohbey's Chatbot, How can I assist you today?",
        },
        { role: "user", content: message },
      ],
    };
    showLoadingIndicator();
    try {
      let response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} - ${responseData.error || "Unknown error"}`
        );
      }
      if (
        responseData &&
        responseData.choices &&
        responseData.choices.length > 0
      ) {
        let botResponse = responseData.choices[0].message.content;
        hideLoadingIndicator();
        return botResponse;
      }
    } catch (error) {
      console.error(error);
      hideLoadingIndicator();
      throw new Error("Sorry, an error occurred. Please try again!");
    }
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
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});
