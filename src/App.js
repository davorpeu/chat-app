import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Input from "./components/Input";
import Messages from "./components/Messages";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { randomName, randomColor } from "./utils/Utils";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState(null);
  const [room, setRoom] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const channel_id = process.env.REACT_APP_CHANNEL_ID;

  useEffect(() => {
    const drone = new window.Scaledrone(channel_id);
    setDrone(drone);

    drone.on("open", (error) => {
      if (error) {
        console.error(error);
        return;
      }
      const member = {
        id: drone.clientId,
        username: randomName(),
        color: randomColor(),
      };
      setCurrentMember(member);
    });

    const room = drone.subscribe("observable-room");
    setRoom(room);

    room.on("data", (data, member) => {
      if (
        drone &&
        drone.clientId &&
        member.id !== drone.clientId &&
        data !== ""
      ) {
        const newMessage = {
          author: member.username || "Unknown",
          text: data,
          isMine: false,
        };

        setMessages((prevMessages) => {
          const existingMessage = prevMessages.find(
            (message) =>
              message.author === newMessage.author &&
              message.text === newMessage.text
          );

          if (!existingMessage && newMessage.author !== drone.clientId) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
      }
    });

    return () => {
      drone.close();
    };
  }, []);

  const handleSendMessage = (text) => {
    if (drone && currentMember) {
      // Add a null check for currentMember
      const newMessage = {
        author: currentMember.username || "Unknown", // Use a fallback value if username is null
        text: text,
        isMine: true,
      };

      setMessages((prevMessages) => {
        const existingMessage = prevMessages.find(
          (message) =>
            message.author === newMessage.author &&
            message.text === newMessage.text
        );

        if (!existingMessage) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });

      drone.publish({
        room: "observable-room",
        message: text,
      });
    }
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
        <Messages messages={messages} currentMember={currentMember} />
        <Input onSendMessage={handleSendMessage} />
      </Box>
    </ThemeProvider>
  );
};

export default ChatApp;
