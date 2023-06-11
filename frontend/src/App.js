import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Avatar
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const API_URL = "http://localhost:8000/niaa/";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chatContainer: {
    padding: theme.spacing(2),
    maxWidth: "600px"
  },
  messageContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  userMessageContainer: {
    justifyContent: "flex-end"
  },
  botMessageContainer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText
  },
  messageText: {
    flexGrow: 1,
    marginRight: theme.spacing(1)
  },
  inputContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1), // Add margin bottom for gap
    display: "flex",
    justifyContent: "space-between", // Align button at the right
    alignItems: "center"
  },
  button: {
    marginLeft: theme.spacing(1) // Add margin left for gap
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2)
  },
  logoImage: {
    maxWidth: "100%",
    height: "auto"
  },
  avatar: {
    marginRight: theme.spacing(1)
  }
}));

function waitForFiveSeconds() {
  console.log("Start");

  setTimeout(function () {
    console.log("Waited for 5 seconds");
    // Do something after waiting for 5 seconds
  }, 5000);

  console.log("End");
}

const App = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi I am Niaa, How can I help you?" }
  ]);

  const [inputText, setInputText] = useState("");

  function handleClick() {
    const text = { type: "user", text: inputText };
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(text)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response);
        waitForFiveSeconds();
        setMessages([...messages, text, { type: "bot", text: data.response }]);
        setInputText("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleChange(e) {
    setInputText(e.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Grid container className={classes.container}>
          <Paper elevation={3} className={classes.chatContainer}>
            <img
              src="https://www.saveetha.ac.in/images/sec/2020/home/building_2.jpg"
              alt="Saveetha Logo"
              className={classes.logoImage}
            />
            <img
              src="https://www.saveetha.ac.in/images/WEB_LOGO-01.png"
              alt="Saveetha Logo"
              className={classes.logoImage}
            />
            <br />
            <br />

            {messages.map((message, index) => (
              <Grid
                key={index}
                container
                className={`${classes.messageContainer} ${
                  message.type === "user"
                    ? classes.userMessageContainer
                    : classes.botMessageContainer
                }`}
              >
                {message.type === "bot" ? (
                  <Avatar
                    src="https://chat.npfs.co/static/backend/img/niaa-new.png?1641646470"
                    alt="Niaa"
                    className={classes.avatar}
                  />
                ) : (
                  ""
                )}

                <Typography
                  variant="body1"
                  className={classes.messageText}
                  align={message.type === "user" ? "right" : "left"}
                >
                  {"     " + message.text}
                </Typography>
              </Grid>
            ))}
            <Grid container className={classes.inputContainer}>
              <TextField
                fullWidth
                variant="filled"
                value={inputText}
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleClick();
                  }
                }}
              />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Grid container justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  onClick={handleClick}
                  className={classes.button}
                ></Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
