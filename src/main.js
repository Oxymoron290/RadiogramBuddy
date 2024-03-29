const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const Store = require('./store.js');
const fs = require('fs');

const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        windowBounds: { width: 800, height: 600 }
    }
});

const createWindow = () => {
    let { width, height } = store.get('windowBounds')
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.webContents.openDevTools();

    win.on('resize', () => {
        // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
        // the height, width, and x and y coordinates.
        let { width, height } = win.getBounds();
        // TODO: Minimums
        // Now that we have them, save them using the `set` method.
        store.set('windowBounds', { width, height });
    });

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

    let i = 1;
    ipcMain.handle('ping', () => 'pong ' + i++)
    ipcMain.handle('saveRadiogram', async (event, data) => {
        // TODO: generate file name or save to database.
        try { fs.writeFileSync('radiogram.json', JSON.stringify(data, null, 2), 'utf-8'); }
        catch(e) { console.error('Failed to save the file!'); console.error(e); }
    });
    
    //win.loadFile('html/index.html')
    win.loadFile('html/radiogram.html')
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