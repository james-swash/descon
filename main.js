//console.log('testin...')

const remote = require('electron').remote
const {app, BrowserWindow, Menu} = require('electron')
//main process
const path = require('path')
const url = require('url')
require('electron-reload')(__dirname);
let win

function createWindow() {
    win = new BrowserWindow({width:850, height:417, frame: true, webPreferences: {webSecurity: false}})
    win.loadURL(url.format({
        pathname:path.join(__dirname, 'home.html'),
        node: {
            __dirname: false,
            __filename: false
          },
        protocol: 'file',
        slashes:true
    }))

    win.on('closed', () => {
        win = null
    })

    //win.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()    
    // if(process.platform !== 'darwin'){
    //     app.quit()
    // }
})

app.on('activate', () => {
    if (win == null){
        createWindow()
    }
})


