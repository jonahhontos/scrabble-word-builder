
# Scrabble Word Builder

## Overview

Welcome to my repo for the Scrabble Word Builder code test! I had a lot of fun making this, and appreciate your time in reviewing it.

As this code test is for a mostly web app related SDE position, I elected to complete the test as a web app.

The UI for this app was built using [Preact](https://preactjs.com/), a lightweight alternative to React that contains much of the same core functionality. It seemed appropriate for something small like this, and I had been wanting to try it out.

To satisfy the requirement of being executable, the app uses [Electron](https://www.electronjs.org/) to create a standalone executable that runs the app in an OS native Chromium-based browser view. This is another tool that I have been particularly interested in looking into.

Due to file size limitations in GitHub, I was unfortunately unable to include the final distributable, but did what I could to make the setup process as painless as possible.

## Setup and Installation

### Dev and Build Commands
Start by cloning this repository to your local machine, opening up your OS's terminal/CLI, and navigating to the repo's root directory.

Before running any commands, be sure to install all dependencies:
```
npm install
```

In case you run into any compatibility issues, I used `node@v25.2.1` and `npm@11.6.2` when making this app.


### Running in Dev Mode
This should be the quickest and easiest way to run the app.

To open a live-updating instance of Electron to test changes to the Preact app in a native window:
```
npm run start-dev
```

<details>

<summary>Other dev actions</summary>

To run the Vite server for just the Preact app in a browser:

```
npm run dev
```

To view the most recently built version of the Preact app in an Electron native window:

```
npm start
```

</details>


### Building the App

To build both the Preact app and the Electron standalone:
```
npm run make-all
```

The resulting installers or executables will be located in `./out/make`

<details>

<summary>Other build actions</summary>

To build just the Preact app:

```
npm run build
```

To build the Electron standalone from the most recently built Preact app:

```
npm run make
```

</details>


## Usage Guidelines

### How to Play

Once the app loads, you will have three interactive elements:

#### Rack Tiles Input
Use this field to set which tiles appear in the rack. This will be automatically validated as you type (after a brief debounce), to ensure that only valid characters are used, the rack does not go under 1 tile once filled (max is capped on the field), and that the tiles added do not exceed the total available in the game. The tiles will appear on the rack if valid.

#### Placed Word Input
This field functions similarly to the rack tiles field, with additional logic to verify that the word is in the dictionary. The field will also permit being emptied, and when a valid word is entered, it will appear in the "board" area.

#### Play Button
Click this button to calculate the highest scoring word possible with the pool letters available between the rack and the placed word. This button can only be used when the inputs provided are valid.

### Editing the Data Files

To make updates to the dictionary, you can edit `./preact-app/src/assets/dictionary.txt`, then either run a dev instance or make a new build as described above. If you are already running a dev instance, the change should reflect automatically on save.

The same can be done for the letter data located at `./preact-app/src/assets/letter_data.json`


## Design Considerations

### Code Structure
The code is separated into three main components: the Preact app, which handles user interactions and rendering the UI, `gameLogic.ts`, which handles processing the data files and the core logic of the game mechanics, and the Electron app, which handles running the app in a native browser view.

### Game Logic
This script functions like a quasi-backend. It begins its life cycle by pre-processing the given `dictionary.txt`. It calculates all word scores, and creates map of number of occurrences of characters. It then sorts the dictionary, primarily by score and secondarily by alphabetical order. This then allows the calculation of the highest scoring word to proceed through the dictionary linearly and test each entry whose length fits within the available character pool against that pool's letter count and return the first valid word it finds, which is by definition the highest scoring word possible, in alphabetical order. I chose this method to make the lookup highly efficient, in order to better handle very large dictionaries, if given.

This script also creates a map of character limits from `letter_data.json`, and uses this along with the processed dictionary to test and validate user inputs.

### Preact App
This app functions as the game's frontend. It handles user interactions, and displays results. I opted to go with a design that is simple and minimal to cut down on complexity, but still visually appealing, and with small nods to the original Scrabble game in the presentation of the tiles. I spent a considerable amount of time tweaking this until it looked nice and the feel of interactions seemed just right.

I chose Preact specifically because it seemed appropriate for a small, simple app, while also providing the convenience of a modern reactive framework.

I designed this specifically to function as a desktop app, but as it could also just as easily be deployed to the web, I did retroactively make some quick mobile-friendly adjustments to the design.

### Electron App
This app functions like a server for the rest of the app. It uses a simple Express server to host the app locally, and then loads this in a native browser view. I chose to use this in order to make the app executable, as per the requirements.

### NPM Scripts
As this project involves two separate apps with separate build processes, I also made a few customizations to the npm scripts.

In my initial development, I was focused on creating just the Preact app and game logic, and later added Electron. I did things this way to ensure I had something deliverable before the deadline, as I wasn't sure how involved the Electron setup would be. Knowing what I know now, I would have probably just started off with both from the get-go.

That being said, the Preact app is nested within the Electron app, with its own separate dependencies and build processes, and I added in new scripts to streamline things, allowing all dependencies to be installed from the root folder, and allowing both projects to be built or run in dev with single commands; the result being that in ideal circumstances, it should only take two CLI commands to go from a freshly cloned repo to a running app.

### Other Considerations
The requirements suggested showcasing strengths, and this effected my design considerations. I specifically chose Preact and Electron, two tools that I had never worked with before, to showcase my ability to engage with new technologies and quickly put them to productive use. It also allowed me to show my comfort with working within multiple areas of the codebase. Lastly, I wanted to show my attention to detail, taking into consideration as much as possible before shipping a product, although in retrospect I feel that I may have perhaps gotten a little carried away and could have submitted something a little simpler.
