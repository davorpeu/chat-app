import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(1),
    "&.isMine": {
      justifyContent: "flex-end",
    },
  },
  messageBubble: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    maxWidth: "75%",
  },
  myMessageBubble: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  otherUserMessageBubble: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

const Messages = ({ messages }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box>
      {messages.map((message, index) => (
        <Box
          key={index}
          className={`${classes.messageContainer} ${
            message.isMine ? "isMine" : ""
          }`}
        >
          <Paper
            className={`${classes.messageBubble} ${
              message.isMine
                ? classes.myMessageBubble
                : classes.otherUserMessageBubble
            }`}
            elevation={3}
            style={{
              backgroundColor: message.isMine
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
              color: message.isMine
                ? theme.palette.primary.contrastText
                : theme.palette.secondary.contrastText,
            }}
          >
            <Typography color="inherit">
              {`${message.author}: ${message.text}`}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default Messages;
