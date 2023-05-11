# Sesh
Sesh is a Chrome extension that aims to help improve one's producitvity and life style by reminding the user of essential tasks, such as drinking water, eating, studying breaks, and categorizing browser history. 
SJSU CMPE/SE Department Senior Project by Nanar Boursalian, Annabel Kusumo, Surabhi Gupta, Seema Vora

## Steps to Pull the Code
- Open up a terminal (VSCode, etc) and cd into a folder of your choice.
- Run `git clone https://github.com/nanarboursal/Sesh.git`
- After this, you should be able to see the project contents inside the folder that you are in.
- Run `cd Sesh`, followed by `cd sesh`
- Run `npm install`
- Add the following api-key <insert api key here> to `BrowserHistory2.js` so that the project can access OpenAI’s API for browser history recommendation.

## Steps to Run Chrome Extension:
- Go to `chrome://extensions/`, make sure your developer mode is turned on
- Click on `Load Unpacked`
- Open up the `build` folder (the public and build folder contains our manifest file)
- Pin Sesh's chrome extension.
- Everytime you made edits, you need to run `npm run build` and click Sesh's chrome extension icon to see the changes
- Make sure to enable notifications on the device that you are running the project on.

## Code Structure
- The frontend of the Chrome extension is under the `/src` folder and holds all the pages, as well as the icons and styling used. 
   * The key features are Pomodoro Timer, Health Reminders, Word-of-the-Day and Broswer History Analyzer.
- The backend of the extension is Chrome APIs such as local storage, history, and notifications is inside the file called `background.js`.
