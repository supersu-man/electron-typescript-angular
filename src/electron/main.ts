import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';


let mainWindow: Electron.BrowserWindow;
let updateWindow: Electron.BrowserWindow;

const assetsPath = process.argv.includes('--dev') ? '../src/assets' : 'browser/assets'
const indexUrl = url.format({
  pathname: path.join(__dirname, 'browser/index.html'),
  protocol: 'file',
  slashes: true,
  hash: '#'
})

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
    mainWindow.loadURL('http://localhost:4200/#')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(indexUrl)
  }

  mainWindow.on('closed', () => {
    mainWindow.destroy()
  });
}

function createUpdateWindow() {
  updateWindow = new BrowserWindow({
    height: 180,
    width: 500,
    resizable: false,
    closable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, assetsPath + '/icon.png')
  });
  updateWindow.removeMenu()

  if(process.argv.includes('--dev')) {
    updateWindow.loadURL('http://localhost:4200/#/update')
    // updateWindow.webContents.openDevTools()
  } else {
    updateWindow.loadURL(indexUrl + '/update')
  }

  updateWindow.on('closed', () => {
    updateWindow.destroy()
  });

}

app.on('ready', () => {
  createWindow()
  createUpdateWindow()
});

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