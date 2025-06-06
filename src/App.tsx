import "./App.css";
import "./variables.css";
import ChatWindow from "./components/chatWindow/chatWindow.tsx";
import ChatMessage from "./models/ChatMessage.ts";
import { sentence } from "txtgen";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = useCallback((message: string) => {
    const newMessage = new ChatMessage();
    newMessage.message = message;
    newMessage.author = "techb";
    newMessage.isCurrentUserAuthor = Math.random() < 0.5;

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const generateRandomMessage = useCallback(() => {
    const message = sentence();
    sendMessage(message);
  }, [sendMessage]);

  useEffect(() => {
    const intervalId = setInterval(generateRandomMessage, 10000);
    return () => clearInterval(intervalId);
  }, [generateRandomMessage]);

  return <ChatWindow messages={messages} addNewMessage={sendMessage} />;
}
