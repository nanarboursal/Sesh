chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
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
});
