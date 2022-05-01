const { app, BrowserWindow } = require('electron')
const path = require('path')
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 900,
        transparent: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }

    })
    mainWindow.loadFile('index.html')
    mainWindow.setBackgroundColor('rgba(90, 104, 255, 0.24)')
}
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})