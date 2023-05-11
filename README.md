# Sesh
SJSU CMPE/SE Department Senior Project by Nanar Boursalian, Annabel Kusumo, Surabhi Gupta, Seema Vora

## Steps to pull the code
- Open up a terminal (VSCode, etc) and cd into a folder of your choice.
- Run `git clone https://github.com/nanarboursal/Sesh.git`
- After this, you should be able to see the project contents inside the folder that you are in.
- Run `cd Sesh`, followed by `cd sesh`
- Run `npm install`
- Add the following api-key <insert api key here> to `BrowserHistory2.js` so that the project can access OpenAI’s API for browser history recommendation.

## Steps to run chrome extension:
- Go to `chrome://extensions/`, make sure your developer mode is turned on
- Click on `Load Unpacked`
- Open up the `build` folder (the public and build folder contains our manifest file)
- Pin Sesh's chrome extension.
- Everytime you made edits, you need to run `npm run build` and click Sesh's chrome extension icon to see the changes
- Make sure to enable notifications on the device that you are running the project on.
