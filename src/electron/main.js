import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    if (isDev()) {
        win.loadURL('http://localhost:5123');
    }
    else {
        win.loadFile(path.join(app.getAppPath(), 'dist-react', 'index.html'));
    }
}
app.whenReady().then(createWindow);
