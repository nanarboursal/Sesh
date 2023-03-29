chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  // Food Timer Logic
  chrome.storage.local.get(["foodTimer", "foodIsRunning"], (res) => {
    const time = res.foodTimer ?? 0;
    const isRunning = res.foodIsRunning ?? true;
    if (!isRunning) {
      return;
    }
    if (time == 0) {
      this.registration.showNotification("Sesh", {
        body: `Time is up, eat some food!`,
      });
      chrome.storage.local.set({
        foodIsRunning: false,
      });
    }
    chrome.storage.local.set({
      foodTimer: time - 1,
    });
  });

  // Stretch Timer Logic
  chrome.storage.local.get(["stretchTimer", "stretchIsRunning"], (res) => {
    const time = res.stretchTimer ?? 0;
    const isRunning = res.stretchIsRunning ?? true;
    if (!isRunning) {
      return;
    }
    if (time == 0) {
      this.registration.showNotification("Sesh", {
        body: `Time is up, get up and stretch!`,
      });
      chrome.storage.local.set({
        stretchIsRunning: false,
      });
    }
    chrome.storage.local.set({
      stretchTimer: time - 1,
    });
  });

  // Water Timer Logic
  chrome.storage.local.get(["waterTimer", "waterIsRunning"], (res) => {
    const time = res.waterTimer ?? 0;
    const isRunning = res.waterIsRunning ?? true;
    if (!isRunning) {
      return;
    }
    if (time == 0) {
      this.registration.showNotification("Sesh", {
        body: `Time is up, drink some water!`,
      });
      chrome.storage.local.set({
        waterIsRunning: false,
      });
    }
    chrome.storage.local.set({
      waterTimer: time - 1,
    });
  });

  // Pomodoro Timer Logic
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
      // If pomodoro timer is not running, skip timer logic.
      const isRunning = res.pomoIsRunning ?? true;
      if (!isRunning) {
        return;
      }

      const currSessions = res.currSessions;
      const totalNumSessions = res.pomoSessions;

      // If the current session is not the last one, turn on focus or break timer.
      if (currSessions < totalNumSessions) {
        const currFocusTime = res.currFocusTimer;
        const currBreakTime = res.currBreakTimer;
        if (currFocusTime < res.pomoFocusTimer) {
          // Increment current focus timer if it has not reached the total focus time
          chrome.storage.local.set({
            currFocusTimer: currFocusTime + 1,
          });
          // If current focus time has reached pomodoro focus time, we send user an alert to take short break.
          if (currFocusTime + 1 == res.pomoFocusTimer) {
            console.log(
              "Session: " + currSessions + ", finished focus session"
            );
            this.registration.showNotification("Sesh", {
              body: `You have completed your focus session. Time to start your break!`,
            });
          }
        } else {
          // After focus timer has finished, turn on break timer.
          if (currBreakTime < res.pomoBreakTimer) {
            chrome.storage.local.set({
              currBreakTimer: currBreakTime + 1,
            });
          } else if (currBreakTime == res.pomoBreakTimer) {
            // If we finished the break, it means the current session finished.
            // So we increment the current session number by 1.
            // Reset the current timers for both break and focus.
            chrome.storage.local.set({
              currBreakTimer: 0,
              currFocusTimer: 0,
              currSessions: currSessions + 1,
            });

            console.log(
              "Session: " + currSessions + ", finished break session"
            );
            this.registration.showNotification("Sesh", {
              body: `You have completed your break. Time to start your focus session!`,
            });
          }
        }
      } else if (res.currSessions == res.pomoSessions) {
        // If we are in our last session, we swap out break time for extended time.
        const currFocusTime = res.currFocusTimer;
        if (currFocusTime < res.pomoFocusTimer) {
          // Increment current focus timer if it has not reached the total focus time
          chrome.storage.local.set({
            currFocusTimer: currFocusTime + 1,
          });
          // If current focus time has reached pomodoro focus time, we send user an alert to take short break.
          if (currFocusTime + 1 == res.pomoFocusTimer) {
            console.log(
              "Session: " +
                currSessions +
                ", finished your LAST focus session next is extended break."
            );
            this.registration.showNotification("Sesh", {
              body: `You have completed your last focus session. Time to start your extended break!`,
            });
          }
        } else {
          // If we finished our last session, we want to run the extended break timer.
          // After the extended break timer ends, we have finished the entire pomodoro session.
          var currTime = res.currExtendedBreakTimer;
          var extendedBreakTime = res.pomoExtendedBreakTimer;
          if (currTime == extendedBreakTime) {
            console.log(
              "Session: " + currSessions + ", finished extended break. DONE!"
            );
            this.registration.showNotification("Sesh", {
              body: `Your extended break ended. Congrats, you finished your Pomodoro Session!`,
            });
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
          }
          chrome.storage.local.set({
            currExtendedBreakTimer: currTime + 1,
          });
        }
      }
    }
  );
});
