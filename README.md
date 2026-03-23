
# Scrabble Word Builder

## Overview

Welcome to my repo for the Scrabble Word Builder code test! I had a lot of fun making this, and appreciate your time in reviewing it.

As this code test is for a mostly web app related SDE position, I elected to complete the test as a web app.

The UI for this app was built using [Preact](https://preactjs.com/), a lightweight alternative to React that contains much of the same core functionality. It seemed appropriate for something small like this, and I had been wanting to try it out.

To satisfy the requirement of being executable, the app uses [Electron](https://www.electronjs.org/) to create a standalone executable that runs the app in an OS native Chromium-based browser view. This is another tool that I have been particularly interested in looking into.

Due to file size limitations in GitHub, I was unfortunately unable to include the final distributable, but did what I could to make the setup process as painless as possible.

## Setup and Installation

### Dev and Build Commands
Start by opening up your OS's terminal/CLI.

Before running any commands, be sure to install all dependencies:
```
npm install
```

In case you run into any compatibility issues, I used `node@v25.2.1` and `npm@11.6.2` when making this app.


#### Running in Dev Mode
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


#### Building the App

To build both the Preact app and the Electron standalone:
```
npm run make-all
```

The resulting installers or executables will be located in `./out/make`

<details>

<summary>Other build actions</summary>

To build just the Preact app:

```
npm rum build
```

To build the Electron standalone from the most recently built Preact app:

```
npm run make
```

</details>


#### Editing the Data Files

To make updates to the dictionary, you can edit `./preact-app/src/assets/dictionary.txt`, then either run a dev instance or make a new build as described above. If you are already running a dev instance, the change should reflect automatically.

The same can be done for the letter data located at `./preact-app/src/assets/letter_data.json`

