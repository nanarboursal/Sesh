import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

function PomodoroTimer() {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [extendedBreakTime, setExtendedBreakTime] = useState(30);
  const [numSessions, setNumSessions] = useState(4);
  const [progress, setProgress] = useState(0);
  const [active, setIsActive] = useState(false);

  chrome.storage.local.get(["pomoIsRunning"], (res) => {
    setIsActive(res.pomoIsRunning);
  });

  function minutesToSeconds(minutes: number) {
    return minutes * 60;
  }

  function updateTimeElements() {
    chrome.storage.local.get(
      [
        "pomoFocusTimer",
        "pomoBreakTimer",
        "pomoSessions",
        "pomoExtendedBreakTimer",
        "pomoIsRunning",
        "currFocusTimer",
        "currBreakTimer",
        "currExtendedBreakTimer",
        "currSessions",
      ],
      (res) => {
        setIsActive(res.pomoIsRunning);

        if (res.pomoIsRunning) {
          setBreakTime(res.pomoBreakTimer);
          setExtendedBreakTime(res.extendedBreakTimer);
          setFocusTime(res.pomoFocusTimer);

          const focusTime = res.currFocusTimer ?? 0;
          const breakTime = res.currBreakTimer ?? 0;
          const extendedBreakTime = res.currExtendedBreakTimer ?? 0;
          const currSessions = res.currSessions;
          const totalSessions = res.pomoSessions;

          // Modify the text for session progresss and progress bar.
          var sessionElement = document.getElementById("sessionCount");
          sessionElement!.textContent = `Session (${currSessions}/${totalSessions})`;
          setProgress(((currSessions * 1.0) / totalSessions) * 100);

          // If timer is not counting down, we will not show countdown
          if (focusTime != 0 && focusTime != res.pomoFocusTimer) {
            var time = res.pomoFocusTimer - focusTime;
            var min = Math.floor((time % 3600) / 60);
            var sec = Math.floor((time % 3600) % 60);
            var focusTimerElement = document.getElementById("focusTime");
            focusTimerElement!.textContent = `${min} min : ${sec} sec`;
          }

          // If timer is not counting down, we will not show countdown
          if (breakTime != 0 && breakTime != res.pomoBreakTimer) {
            var time = res.pomoBreakTimer - breakTime;
            var min = Math.floor((time % 3600) / 60);
            var sec = Math.floor((time % 3600) % 60);
            var breakTimerElement = document.getElementById("breakTime");
            breakTimerElement!.textContent = `${min} min : ${sec} sec`;
          }

          // If timer is not counting down, we will not show countdown
          if (extendedBreakTime != 0 && res.pomoExtendedBreakTimer) {
            var time = res.pomoExtendedBreakTimer - extendedBreakTime;
            var min = Math.floor((time % 3600) / 60);
            var sec = Math.floor((time % 3600) % 60);
            var extendedBreakTimerElement =
              document.getElementById("extendedBreakTime");
            extendedBreakTimerElement!.textContent = `${min} min : ${sec} sec`;
          }
        }
      }
    );
  }

  updateTimeElements();
  setInterval(updateTimeElements, 1000);

  function onActivate() {
    // Added activation logic here
    // Save each time and number session into pomodoro local storage variables
    console.log("Total sessions: " + numSessions);

    chrome.storage.local.set({
      pomoFocusTimer: minutesToSeconds(focusTime),
      pomoBreakTimer: minutesToSeconds(breakTime),
      pomoSessions: numSessions,
      pomoExtendedBreakTimer: minutesToSeconds(extendedBreakTime),
      currFocusTimer: 0,
      currBreakTimer: 0,
      currExtendedBreakTimer: 0,
      currSessions: 1,
      pomoIsRunning: true,
    });

    setIsActive(true);
  }

  function onDeactivate() {
    // Added deactivation logic here
    // Set all pomodoro local storage variables to 0.
    chrome.storage.local.set({
      pomoFocusTimer: 0,
      pomoBreakTimer: 0,
      pomoSessions: 0,
      pomoExtendedBreakTimer: 0,
      currFocusTimer: 0,
      currBreakTimer: 0,
      currExtendedBreakTimer: 0,
      currSessions: 0,
      pomoIsRunning: false,
    });
    setIsActive(false);
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        backgroundColor: "#b6cdf2",
        opacity: [0.9, 0.8, 0.7],
        padding: "10px",
      }}
      autoComplete="off"
    >
      {!active && (
        <Grid>
          <Grid container padding="10px" columnSpacing={{ xs: 3 }}>
            <Grid item xs={7} sx={{ paddingLeft: "5px", paddingTop: "10px" }}>
              Focus Time
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="outlined-number"
                label="Minutes"
                type="number"
                size="small"
                value={focusTime}
                onChange={(event: any) => setFocusTime(event.target.value)}
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
                  width: "90%",
                }}
              />
            </Grid>
          </Grid>

          <Grid container padding="10px" columnSpacing={{ xs: 3 }}>
            <Grid item xs={7} sx={{ paddingLeft: "5px", paddingTop: "10px" }}>
              Break Time
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="outlined-number"
                label="Minutes"
                type="number"
                size="small"
                value={breakTime}
                onChange={(event: any) => setBreakTime(event.target.value)}
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
                  width: "90%",
                }}
              />
            </Grid>
          </Grid>

          <Grid container padding="10px" columnSpacing={{ xs: 3 }}>
            <Grid item xs={7} sx={{ paddingLeft: "5px", paddingTop: "10px" }}>
              Extended Break Time
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="outlined-number"
                label="Minutes"
                type="number"
                size="small"
                value={extendedBreakTime}
                onChange={(event: any) =>
                  setExtendedBreakTime(event.target.value)
                }
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
                  width: "90%",
                }}
              />
            </Grid>
          </Grid>

          <Grid container padding="10px" columnSpacing={{ xs: 3 }}>
            <Grid item xs={7} sx={{ paddingLeft: "5px", paddingTop: "10px" }}>
              Number of Sessions
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="outlined-number"
                label="Sessions"
                type="number"
                size="small"
                value={numSessions}
                onChange={(event: any) => setNumSessions(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">sessions</InputAdornment>
                  ),
                  inputProps: {
                    max: 100,
                    min: 0,
                  },
                }}
                sx={{
                  width: "90%",
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              size="medium"
              variant="contained"
              onClick={onActivate}
              sx={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Activate
            </Button>
          </Grid>
        </Grid>
      )}

      {active && (
        <Grid>
          <Grid>
            <Grid item xs={12}>
              Your Progress:
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    color="success"
                    value={progress}
                  />
                </Box>
                <Box sx={{ minWidth: 85 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    id="sessionCount"
                  >
                    Session (3/4)
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid container padding="10px" columnSpacing={{ xs: 3 }}>
              <Grid item xs={3}>
                Focus time ({focusTime} min):
              </Grid>
              <Grid item xs={8} id="focusTime">
                -- not in use --
              </Grid>
            </Grid>
            <Grid container padding="10px" columnSpacing={{ xs: 3 }}>
              <Grid item xs={3}>
                Break time ({breakTime} min):
              </Grid>
              <Grid item xs={8} id="breakTime">
                -- not in use --
              </Grid>
            </Grid>
            <Grid container padding="10px" columnSpacing={{ xs: 3 }}>
              <Grid item xs={3}>
                Extended Break time ({extendedBreakTime} min):
              </Grid>
              <Grid item xs={8} id="extendedBreakTime">
                -- not in use --
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              size="medium"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
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

export default PomodoroTimer;
