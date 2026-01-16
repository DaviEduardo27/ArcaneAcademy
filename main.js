const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

// Trava de Instância Única
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({
      title: "Arcane Academy",
      icon: path.join(__dirname, 'icone.ico'), 
      fullscreen: true,      
      frame: false,          
      autoHideMenuBar: true, 
      resizable: false,      
      backgroundColor: '#020105', // Cor do fundo do seu jogo
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: false, // Desabilite em produção
        backgroundThrottling: false // Impede que o jogo trave se minimizado
      }
    });

    mainWindow.loadFile('index.html');
    mainWindow.setMenu(null);

    // Otimização: Forçar GPU
    app.commandLine.appendSwitch('ignore-gpu-blacklist');
    app.commandLine.appendSwitch('enable-gpu-rasterization');
    app.commandLine.appendSwitch('enable-zero-copy');

    mainWindow.on('closed', function () {
      mainWindow = null;
    });
  }

  app.whenReady().then(() => {
    createWindow();

    // Bloqueios de segurança (Modo Quiosque)
    globalShortcut.register('F11', () => { return false; });
    globalShortcut.register('CommandOrControl+R', () => { return false; });
    globalShortcut.register('F5', () => { return false; });
    globalShortcut.register('Ctrl+Shift+I', () => { return false; });
  });

  ipcMain.on('app-quit', () => {
    app.quit();
  });

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });
}