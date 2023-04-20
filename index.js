//electron .
//electron-forge start
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const config = require('./config.js')

let mainwWindow;

const isMac = process.platform === 'darwin'
const isDev = config.node_env === 'd'

//Menu Setup

let fileMenu = []
if(isDev){
  fileMenu.push({ role: 'toggleDevTools' })
  fileMenu.push({label: 'Quit', click: () => app.quit(), accelerator: 'CmdOrCtrl+W'})
}else{
  fileMenu.push({label: 'Quit', click: () => app.quit(), accelerator: 'CmdOrCtrl+W'})
}
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
    submenu: fileMenu
  }, 
  ...(!isMac ? [{
    label: 'Tools',
    submenu: [
      {label: 'About', click: () => createAboutWindow()}, 
      {label: 'Webhook Sender', click: () => createWebhookWindow()}, 
      {label: 'Userinfo', click: () => createUserInfoWindow()}]
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

  mainwWindow.loadFile("./views/index.html")
}

function createAboutWindow() {
  mainwWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  })

  mainwWindow.loadFile("./views/about.html")
}

function createUserInfoWindow() {
  mainwWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainwWindow.loadFile("./views/userinfo.html")
}


function createWebhookWindow() {
  mainwWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainwWindow.loadFile("./views/webhook.html")
}

app.on('ready', () => {
  createMainWindow()
  mainwWindow.maximize()

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