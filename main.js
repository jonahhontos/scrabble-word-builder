const express = require('express');
const path = require('path');
const expressApp = express();
const PORT = 3000;

const { app, BrowserWindow } = require('electron/main')

const filePath = path.join(__dirname, 'preact-app', 'dist', 'index.html');

expressApp.get('/', (req, res) => {
  res.sendFile(filePath);
});

expressApp.use(express.static(path.join(__dirname, 'preact-app', 'dist')));

expressApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 900
  })

  win.loadURL('http://127.0.0.1:3000')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})