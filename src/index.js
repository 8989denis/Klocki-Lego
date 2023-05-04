const { app, BrowserWindow } = require('electron')
require('./backend')
// Obsługa błędu zwiazanego z biblioteka GL
app.disableHardwareAcceleration()
// Obsługa Okna Aplikacji
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    minWidth: 1300,
    minHeight: 800,
    center: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
    },
  })
  // and load the index.html of the app.
  mainWindow.loadFile(__dirname + '/index.html')
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
   mainWindow.removeMenu()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.