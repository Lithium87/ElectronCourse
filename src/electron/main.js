import {app, BrowserWindow} from 'electron';
import path from 'path';
function createWindow () {
  const win = new BrowserWindow ({
    width: 800,
    height: 600,
  });
  win.loadFile (path.join (app.getAppPath (), 'dist-react', 'index.html'));
}
app.whenReady ().then (createWindow);
