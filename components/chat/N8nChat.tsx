"use client";

import { useEffect } from "react";

// Loaded from jsdelivr as a native <script type="module"> instead of an npm
// dependency: @n8n/chat drags in Vue + the full n8n design system (~270
// packages) for what is, here, a single floating widget.
const CHAT_CSS_URL = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
const CHAT_BUNDLE_URL =
  "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";

const CHAT_OPTIONS = {
  webhookUrl:
    "https://illenluna.app.n8n.cloud/webhook/bd400191-8971-46c3-aee1-c649236491ea/chat",
  mode: "window",
  showWelcomeScreen: false,
  loadPreviousSession: false,
  defaultLanguage: "pt",
  initialMessages: [
    "Olá! 👋",
    "Sou o assistente virtual do Café Inc. Posso ajudar com cardápio, reservas ou eventos.",
  ],
  i18n: {
    pt: {
      title: "Café Inc.",
      subtitle: "Dúvidas sobre cardápio, reservas ou eventos? É só chamar.",
      footer: "",
      getStarted: "Iniciar conversa",
      inputPlaceholder: "Digite sua mensagem...",
      closeButtonTooltip: "Fechar",
    },
  },
};

export function N8nChat() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CHAT_CSS_URL;
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { createChat } from "${CHAT_BUNDLE_URL}";
      createChat(${JSON.stringify(CHAT_OPTIONS)});
    `;
    document.body.appendChild(script);

    return () => {
      link.remove();
      script.remove();
    };
  }, []);

  return null;
}
