
# Scrabble Word Builder

## Setup and Installation

### Windows

To run the app on Windows, it will either need to be built on a Windows machine or alternatively, you can run the local Electron Dev (see next sections)

### Dev and Build Commands

Before running any commands, be sure to install all dependencies:
```
npm install
```

#### Running in Dev Mode

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

#### Creating New Builds

To build both the Preact app and the Electron standalone:
```
npm run make-all
```

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