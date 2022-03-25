const path = require('path');

function createElectron(url) {
  const {app, BrowserWindow, ipcMain} = require('electron');
  function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    });
    ipcMain.on('resize', (e, w, h) => {
      win.setSize(w, h);
    })
    if(url) {
      win.loadURL(url);
    } else {
      win.loadFile(path.join(__dirname, 'build', 'index.html'));
    }
  }
  app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
  })
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
}

if(process.env.NODE_ENV === 'development') {
  const express = require('express');
  const path = require('path');
  const exp = express();

  const options = require('./webpack.config')(undefined, { mode: 'development' });
  const compiler = require('webpack')(options);
  exp.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    heartbeat: 1000,
    path: '/__webpackhmr',
    reload: true,
  }));
  exp.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    hot: true,
    stats: 'minimal',
    publicPath: '/'
  }));

  exp.get('/app.css', (req, res) => {
    res.statusCode = 200;
    res.set('Content-Type', 'text/css');
    res.end('');
  });
  exp.use('/', express.static(path.resolve(__dirname, 'public')), (req, res) => {
    res.statusCode = 404;
    res.end();
  });

  const conn = exp.listen(() => {
    const port = conn.address().port;
    console.log('Listening on ' + port)
    createElectron('http://localhost:'+port);
  })
}else {
  createElectron();
}