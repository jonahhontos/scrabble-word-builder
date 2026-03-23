// Imports and dependencies
const express = require('express');
const path = require('path');
const expressApp = express();
const RUN_MODE = process.env.RUN_MODE;
const PORT = RUN_MODE === 'DEV' ? 4000 : 3000;


// Set up the local server for the Preact app
let server;

if (RUN_MODE !== 'DEV'){
  const filePath = path.join(__dirname, 'preact-app', 'dist', 'index.html');

  expressApp.get('/', (req, res) => {
    res.sendFile(filePath);
  });

  const preactAppRoot = RUN_MODE === 'DEV' ? 'src' : 'dist';

  expressApp.use(express.static(path.join(__dirname, 'preact-app', preactAppRoot)));

  server = expressApp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}


// Initialize the Electron native window
const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 900
  })

  win.loadURL(`http://localhost:${PORT}`)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


// Clean up local Preact server when app is closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

if (RUN_MODE !== 'DEV') {
  app.on('closing', ()=> {
    server.close();
  })
}