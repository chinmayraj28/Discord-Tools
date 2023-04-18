//electron .
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const config = require('./config.js')

let mainwWindow;

const isMac = process.platform === 'darwin'
const isDev = config.node_env === 'd'

//Menu Setup
const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: () => createAboutWindow()
      }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl+W'
      }
    ]
  }, 
  ...(!isMac ? [{
    label: 'Help',
    submenu: [{
      label: 'About',
      click: () => createAboutWindow()
    }]
  }] : [])
]


function createMainWindow () {
  mainwWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if(isDev){
    mainwWindow.webContents.openDevTools();
}

  mainwWindow.loadFile("./views/index.html")
}

function createAboutWindow() {
  mainwWindow = new BrowserWindow({
    width: 600,
    height: 400,
  })

  mainwWindow.loadFile("./views/about.html")
}

app.on('ready', () => {
  createMainWindow()

  //Implement menu
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

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