import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import "./chatWindow.css";
import { Send } from "@mui/icons-material";
import type ChatMessage from "../../models/ChatMessage.ts";
import MessageBubble from "../messageBubble/messageBubble.tsx";

interface ChatWindowProps {
  messages: ChatMessage[];
  addNewMessage: (text: string) => void;
}

function ChatWindow(props: ChatWindowProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const messages_div = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (currentMessage.length === 0) {
      return;
    }

    props.addNewMessage(currentMessage);
    setCurrentMessage("");
  };

  const preventEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (messages_div.current)
      messages_div.current.scrollTop = messages_div.current.scrollHeight;
  }, [props.messages]);

  return (
    <Paper
      className="chat-window"
      sx={{ p: 2, display: "flex", flexDirection: "column", minWidth: "90%" }}
    >
      <div ref={messages_div} className="chat-messages" id="chat-messages">
        {props.messages.map((message) => (
          <MessageBubble key={message.id} chatMessage={message} />
        ))}
      </div>
      <form
        className="chat-input-form"
        onSubmit={(e) => {
          sendMessage();
          e.preventDefault();
        }}
      >
        <OutlinedInput
          multiline
          fullWidth
          name="message-input"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          onKeyDown={preventEnterKey}
          placeholder="Type a message"
          endAdornment={
            <InputAdornment
              sx={{
                alignSelf: "start",
              }}
            >
              <IconButton type="submit">
                <Send />
              </IconButton>
            </InputAdornment>
          }
        ></OutlinedInput>
      </form>
    </Paper>
  );
}

export default ChatWindow;
