(function () {
  console.log("Chatbot JS Loaded");
  const API_URL = "http://localhost:3000/api/chat";

  const scriptTag = document.currentScript;
  const ownerId = scriptTag ? scriptTag.getAttribute("data-owner-id") : "demo-id";

  if (!ownerId) {
    console.error("Owner ID missing.");
    return;
  }

  // -----------------------
  // Inject Global Styles for Clean UI
  // -----------------------
  const style = document.createElement("style");
  style.innerHTML = `
    #ai-clean-chat-window * {
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #ai-clean-chat-messages::-webkit-scrollbar {
      width: 6px;
    }
    #ai-clean-chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    #ai-clean-chat-messages::-webkit-scrollbar-thumb {
      background: #e5e7eb;
      border-radius: 10px;
    }
    #ai-clean-chat-input::placeholder {
      color: #9ca3af;
    }
    #ai-clean-send-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    .clean-bot-message {
      background: #ffffff !important;
      border: 1px solid #f3f4f6 !important;
      color: #374151 !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      border-radius: 16px 16px 16px 4px !important;
    }
    .clean-user-message {
      background: #2b313d !important; /* Dark slate color from the image */
      color: #ffffff !important;
      border-radius: 16px 16px 4px 16px !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    }
  `;
  document.head.appendChild(style);

  // -----------------------
  // Floating Button (Dark Slate Smiley)
  // -----------------------
  const button = document.createElement("button");
  // Simple smiley face SVG matching the vibe of the image
  button.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
  `;

  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    background: "#2b313d",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "999999",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  });

  button.onmouseenter = () => {
    button.style.transform = "scale(1.05)";
    button.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
  };
  button.onmouseleave = () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  };

  document.body.appendChild(button);

  // -----------------------
  // Chat Window (Clean Solid Style)
  // -----------------------
  const chat = document.createElement("div");
  chat.id = "ai-clean-chat-window";

  Object.assign(chat.style, {
    position: "fixed",
    bottom: "100px",
    right: "24px",
    width: "360px",
    height: "520px",
    background: "#ffffff",
    border: "1px solid #f3f4f6",
    borderRadius: "20px",
    display: "none",
    flexDirection: "column",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    zIndex: "999999"
  });

  chat.innerHTML = `
        <div style="
            background: #ffffff;
            border-bottom: 1px solid #f3f4f6;
            color: #6b7280;
            padding: 16px 20px;
            font-weight: 600;
            font-size: 13px;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 10px;
            text-transform: uppercase;
        ">
            LIVE CHAT
        </div>

        <div id="ai-clean-chat-messages"
             style="
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                background: #fafafa;
             ">
        </div>

        <div style="
            display: flex;
            padding: 16px;
            border-top: 1px solid #f3f4f6;
            background: #ffffff;
            gap: 12px;
            align-items: center;
        ">
            <input
                id="ai-clean-chat-input"
                placeholder="Type a message..."
                autocomplete="off"
                style="
                    flex: 1;
                    border: 1px solid #e5e7eb;
                    background: #f9fafb;
                    border-radius: 24px;
                    outline: none;
                    padding: 12px 16px;
                    color: #1f2937;
                    font-size: 14px;
                    transition: border-color 0.2s ease, background 0.2s ease;
                "
                onfocus="this.style.background='#ffffff'; this.style.borderColor='#d1d5db';"
                onblur="this.style.background='#f9fafb'; this.style.borderColor='#e5e7eb';"
            />

            <button id="ai-clean-send-btn"
                style="
                    border: none;
                    border-radius: 50%;
                    width: 42px;
                    height: 42px;
                    background: #2b313d;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    `;

  document.body.appendChild(chat);

  // -----------------------
  // Logic
  // -----------------------
  button.onclick = () => {
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  };

  const messages = chat.querySelector("#ai-clean-chat-messages");
  const input = chat.querySelector("#ai-clean-chat-input");
  const send = chat.querySelector("#ai-clean-send-btn");

  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.innerText = text;

    div.style.padding = "12px 16px";
    div.style.maxWidth = "85%";
    div.style.wordWrap = "break-word";
    div.style.fontSize = "14px";
    div.style.lineHeight = "1.5";

    if (sender === "user") {
      div.className = "clean-user-message";
      div.style.marginLeft = "auto";
    } else {
      div.className = "clean-bot-message";
      div.style.marginRight = "auto";
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // Pre-fill a greeting to mimic the preview image interaction (optional)
  setTimeout(() => {
    addMessage("Hi there! How can I help you today?", "bot");
  }, 500);

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    
    // Typing indicator
    const typingDiv = document.createElement("div");
    typingDiv.innerText = "Typing...";
    typingDiv.className = "clean-bot-message";
    typingDiv.style.padding = "8px 16px";
    typingDiv.style.fontSize = "12px";
    typingDiv.style.color = "#9ca3af";
    typingDiv.style.marginRight = "auto";
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          ownerId
        })
      });

      messages.removeChild(typingDiv);

      if (!res.ok) {
        addMessage("Server Error: " + res.status, "bot");
        return;
      }

      const data = await res.json();
      addMessage(data, "bot");
    } catch (err) {
      messages.removeChild(typingDiv);
      addMessage("Unable to reach server.", "bot");
      console.error(err);
    }
  }

  send.onclick = sendMessage;

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });
})();