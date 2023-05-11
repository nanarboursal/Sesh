import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reminders from "../Pages/Reminders";
import PomodoroTimer from "../Pages/PomodoroTimer";
// import BrowserHistory from "../Pages/BrowserHistory";
import BrowserHistory2 from "../Pages/BrowserHistory2";
import WordOfTheDay from "../WordOfTheDay/WordOfTheDay";
import TimerIcon from '@mui/icons-material/Timer';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HistoryIcon from '@mui/icons-material/History';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabsSection() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab icon={<AccessAlarmIcon />} aria-label="Reminders" />
          <Tab icon={<TimerIcon />} aria-label="Pomodoro Timer" />
          <Tab icon={<HistoryIcon />} aria-label="Browser History" />
          <Tab icon={<LocalLibraryIcon />} aria-label="Word of the Day" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Reminders />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PomodoroTimer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <BrowserHistory /> */}
        <BrowserHistory2/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <WordOfTheDay />
      </TabPanel>
    </div>
  );
}

export default TabsSection;
