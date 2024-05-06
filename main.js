const { app, BrowserWindow, systemPreferences } = require('electron');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Be cautious with security implications
      enableRemoteModule: true, // Depending on Electron version
      // If using a later version of Electron, you might need to set `sandbox: false`
    }
  });

  mainWindow.loadFile('index.html'); // Make sure this points to your HTML file

  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('ready', async () => {
  const cameraPermission = await systemPreferences.askForMediaAccess('camera');
  if (!cameraPermission) {
    console.error('Camera access was denied');
    // You can show a message to the user here
  }
});