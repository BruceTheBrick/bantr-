import React from "react";
import type ChatMessage from "../../models/ChatMessage.ts";
import "./messageBubble.css";

interface MessageBubbleProps {
  chatMessage: ChatMessage;
}

function MessageBubble(props: MessageBubbleProps) {
  const className = props.chatMessage.isCurrentUserAuthor ? "author" : "";
  return (
    <div className={"messageBubble " + className}>
      <p
        style={{
          display: "inline-block",
          margin: 0,
        }}
      >
        {props.chatMessage.message}
      </p>
    </div>
  );
}

export default MessageBubble;
