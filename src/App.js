import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Input from "./components/Input";
import Messages from "./components/Messages";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const simulatedConversation = [
      { author: "User A", text: "Hello!", isMine: false },
      { author: "User B", text: "Hi there!", isMine: false },
      { author: "User A", text: "How are you?", isMine: false },
    ];
    setMessages(simulatedConversation);
  }, []);

  const handleSendMessage = (text) => {
    const newMessage = { author: "User A", text, isMine: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
        <Input onSendMessage={handleSendMessage} />
      </Box>
    </ThemeProvider>
  );
};

export default ChatApp;
