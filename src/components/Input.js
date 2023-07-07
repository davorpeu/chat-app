import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Type your message"
        variant="outlined"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fullWidth
      />
      <Button variant="contained" onClick={sendMessage} sx={{ mt: 2 }}>
        Send
      </Button>
    </Box>
  );
};

export default Input;
