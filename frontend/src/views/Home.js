import React, { useState } from "react";
import { Typography, Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import apiCall from "../api/apiCall";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeBody: {
    display: "block",
    minHeight: "100vh",
    paddingTop: "100px",
    textAlign: "center",
    backgroundColor: "#1d2731",
  },
  titleText: {
    marginBottom: "15px",
    lineHeight: "70px",
  },
  subtitleText: {
    lineHeight: "50px",
    color: "#FFFFFF",
  },
  button: {
    margin: "15px",
  },
  inputField: {
    width: "300px",
    margin: "10px",
  },
  cssLabel: {
    color: "#FFFFFF",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#FFFFFF !important",
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [id, setId] = useState();

  const buttonClicked = async (value) => {
    await apiCall({
      endpoint: "toggle-light/",
      method: "post",
      data: {
        id: parseInt(id),
        state: value
      },
    })
      .then((result) => {
        console.log(`Light: ${id} - ENABLED`)
      })
      .catch((err) => {
        alert(`An error occured: ${err}`)
      });
  }

  return (
    <div>
      <Box color="secondary" className={classes.homeBody}>
        <Typography variant="h1" className={classes.titleText}>
          Light Controller
        </Typography>
        <Typography variant="h2" className={classes.subtitleText}>
            Enter the light ID and use the buttons<br />below to toggle the light.
        </Typography>
        <TextField 
            id="outlined-basic" 
            label="Light ID" 
            variant="outlined"
            onChange={(e) => setId(e.target.value)}
            className={classes.inputField}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: "numeric",
            }}
        />
        <Box>
          <Button
            color="primary"
            size="large"
            variant="contained"
            className={classes.button}
            onClick={() => buttonClicked(true)}
          >
            Enable light
          </Button>
          <Button
            color="primary"
            size="large"
            variant="contained"
            className={classes.button}
            onClick={() => buttonClicked(false)}
          >
            Disable light
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;