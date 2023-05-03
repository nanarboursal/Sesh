import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

interface Reminder {
  title: string;
  timerType: string;
}

function ReminderField(props: Reminder) {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [active, setActive] = useState(false);

  const timerName = `${props.timerType}Timer`;

  if (props.timerType == "food") {
    chrome.storage.local.get(["foodIsRunning"], (res) => {
      setActive(res.foodIsRunning);
    });
  } else if (props.timerType == "stretch") {
    chrome.storage.local.get(["stretchIsRunning"], (res) => {
      setActive(res.stretchIsRunning);
    });
  } else {
    chrome.storage.local.get(["waterIsRunning"], (res) => {
      setActive(res.waterIsRunning);
    });
  }

  function updateTimeElement() {
    if (props.timerType == "food") {
      chrome.storage.local.get(["foodTimer"], (res) => {
        const time = res.foodTimer ?? 0;

        if (time >= 0 && active) {
          var hr = Math.floor(time / 3600);
          var min = Math.floor((time % 3600) / 60);
          var sec = Math.floor((time % 3600) % 60);
          var timerElement = document.getElementById(timerName);
          timerElement!.textContent = `${hr} hr : ${min} min : ${sec} sec`;
        }
      });
    } else if (props.timerType == "stretch") {
      chrome.storage.local.get(["stretchTimer"], (res) => {
        const time = res.stretchTimer ?? 0;

        if (time >= 0 && active) {
          var hr = Math.floor(time / 3600);
          var min = Math.floor((time % 3600) / 60);
          var sec = Math.floor((time % 3600) % 60);
          var timerElement = document.getElementById(timerName);
          timerElement!.textContent = `${hr} hr : ${min} min : ${sec} sec`;
        }
      });
    } else {
      chrome.storage.local.get(["waterTimer"], (res) => {
        const time = res.waterTimer ?? 0;

        if (time >= 0 && active) {
          var hr = Math.floor(time / 3600);
          var min = Math.floor((time % 3600) / 60);
          var sec = Math.floor((time % 3600) % 60);
          var timerElement = document.getElementById(timerName);
          timerElement!.textContent = `${hr} hr : ${min} min : ${sec} sec`;
        }
      });
    }
  }

  updateTimeElement();
  setInterval(updateTimeElement, 1000);

  function onActivate() {
    var seconds = hour * 60 * 60 + min * 60;

    if (props.timerType == "food") {
      chrome.storage.local.set({
        foodTimer: seconds,
        foodIsRunning: true,
      });
    } else if (props.timerType == "stretch") {
      chrome.storage.local.set({
        stretchTimer: seconds,
        stretchIsRunning: true,
      });
    } else {
      chrome.storage.local.set({
        waterTimer: seconds,
        waterIsRunning: true,
      });
    }

    setActive(true);
  }

  function onDeactivate() {
    setActive(false);

    if (props.timerType == "food") {
      chrome.storage.local.set({
        foodTimer: 0,
        foodIsRunning: false,
      });
    } else if (props.timerType == "stretch") {
      chrome.storage.local.set({
        stretchTimer: 0,
        stretchIsRunning: false,
      });
    } else {
      chrome.storage.local.set({
        waterTimer: 0,
        waterIsRunning: false,
      });
    }
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        backgroundColor: "#b6cdf2",
        opacity: [0.9, 0.8, 0.7],
      }}
      autoComplete="off"
    >
      <div
        style={{
          marginTop: 5,
          paddingTop: 10,
          paddingLeft: 10,
          fontWeight: 200,
        }}
      >
        {props.title}
      </div>

      {!active && (
        <Grid container padding="10px" columnSpacing={{ xs: 1 }}>
          <Grid item xs={4}>
            <TextField
              id="outlined-number"
              label="Hours"
              type="number"
              size="small"
              value={hour}
              onChange={(event: any) => setHour(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">hr</InputAdornment>
                ),
                inputProps: {
                  max: 24,
                  min: 0,
                },
              }}
              sx={{
                width: "80%",
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-number"
              label="Minutes"
              type="number"
              size="small"
              value={min}
              onChange={(event: any) => setMin(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
                inputProps: {
                  max: 59,
                  min: 0,
                },
              }}
              sx={{
                width: "80%",
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              size="medium"
              variant="contained"
              onClick={onActivate}
              sx={{
                width: "80%",
                marginBottom: "15px",
              }}
            >
              Activate
            </Button>
          </Grid>
        </Grid>
      )}

      {active && (
        <Grid container columnSpacing={{ xs: 1 }}>
          <Grid
            item
            xs={8}
            sx={{ textAlign: "center", fontSize: 18 }}
            id={timerName}
          >
            0 seconds
          </Grid>
          <Grid item xs={4}>
            <Button
              size="medium"
              variant="outlined"
              sx={{
                width: "80%",
                marginBottom: "15px",
              }}
              onClick={onDeactivate}
            >
              Deactivate
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ReminderField;
