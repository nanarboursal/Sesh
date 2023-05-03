import React from "react";
import ReminderField from "./Components/ReminderField";

function Reminders() {
  return (
    <div>
      <p
        style={{
          marginBottom: "5px",
          fontSize: "18px",
          fontStyle: "bold",
          fontWeight: 500,
          marginTop: "-8px",
        }}
      >
        Health Reminders
      </p>
      <ReminderField title="Drink Water" timerType="water" />
      <ReminderField title="Stretch Break" timerType="stretch" />
      <ReminderField title="Eat Food" timerType="food" />
    </div>
  );
}

export default Reminders;
