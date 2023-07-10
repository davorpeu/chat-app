import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Input from "./components/Input";
import Messages from "./components/Messages";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

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
      if (member.id !== drone.clientId && data !== "") {
        const newMessage = {
          author: member.id,
          text: data,
          isMine: member.id === drone.clientId ? true : false,
        };
        setMessages((prevMessages) => {
          // Check if the message already exists in the state
          const existingMessage = prevMessages.find(
            (message) => message.author === member.id && message.text === data
          );
          if (!existingMessage) {
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
    if (drone) {
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

// Random name and color functions from the tutorial
function randomName() {
  const adjectives = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "throbbing",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const nouns = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default ChatApp;
