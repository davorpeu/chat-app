import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Input from "./components/Input";
import Messages from "./components/Messages";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  useEffect(() => {
    const simulatedConversation = [
      { author: "User A", text: "Hello!", isMine: false },
      { author: "User B", text: "Hi there!", isMine: false },
      { author: "User A", text: "How are you?", isMine: false },
    ];
    setMessages(simulatedConversation);

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleMessage = (event) => {
    const { type, data, source } = event.data;

    // Exclude messages from the current tab
    if (type === "chat-message" && source !== window) {
      const newMessage = { author: "User B", text: data, isMine: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const handleSendMessage = (text) => {
    const newMessage = { author: "User A", text, isMine: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (!isBroadcasting) {
      setIsBroadcasting(true);

      // Broadcast the simplified message data to other tabs
      window.postMessage(
        { type: "chat-message", data: text, source: "app" },
        "*"
      );

      // Delay resetting the broadcasting flag to prevent immediate self-reception
      setTimeout(() => {
        setIsBroadcasting(false);
      }, 100);
    }
  };

  const handleChannelCreated = (drone) => {
    setChannel(drone.subscribe("chat-room"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="chat-app">
        <Box
          className="chat-app-header"
          sx={{ bgcolor: theme.palette.primary.main, p: 2 }}
        >
          <Typography variant="h6" component="h1" color="white">
            Chat App
          </Typography>
        </Box>
        <Messages messages={messages} />
        <Input
          onSendMessage={handleSendMessage}
          onChannelCreated={handleChannelCreated}
        />
      </Box>
    </ThemeProvider>
  );
};

export default ChatApp;
