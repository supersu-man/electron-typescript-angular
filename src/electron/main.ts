import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';


let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });
  mainWindow.removeMenu()

  if(process.argv.includes('--dev')) {
    mainWindow.loadURL('http://localhost:4200')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, 'browser/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow.destroy()
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Listen for events with ipcMain.handle
ipcMain.handle('sayHello', (event, param: string) => {
  return "Hello " + param
})