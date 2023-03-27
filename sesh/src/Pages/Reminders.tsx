import React from "react";
import ReminderField from "./Components/ReminderField";

function Reminders() {
  return (
    <div>
      <ReminderField title="Drink Water" timerType="water" />
      <ReminderField title="Stretch Break" timerType="stretch" />
      <ReminderField title="Eat Food" timerType="food" />
    </div>
  );
}

export default Reminders;
