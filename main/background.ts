import { app, Menu, nativeImage, Notification, Tray } from 'electron';
import serve from 'electron-serve';
import { config } from './config';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  // await app.whenReady().then(makeWindow).then(showNotification);
  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click() {
        console.log('New Window');
      },
    },
    {
      label: 'New Window with Settings',
      submenu: [{ label: 'Basic' }, { label: 'Pro' }],
    },
    { label: 'New Command...' },
  ]);

  await app
    .whenReady()
    .then(() => {
      process.env.SERVER_URL = config.SERVER_URL;
      if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu);
      }
    })
    .then(makeWindow)
    .then(showNotification);

  async function makeWindow() {
    const mainWindow = createWindow('main', {
      width: 1200,
      height: 800,
    });

    if (isProd) {
      app.commandLine.appendSwitch('ignore-certificate-errors'); // SSL 인증서 오류 무시 (개발용)
      app.commandLine.appendSwitch('allow-insecure-localhost'); // 로컬호스트에 대한 비보안 연결 허용 (개발용)
      await mainWindow.loadURL('app://./home.html');
    } else {
      const port = process.argv[2];
      await mainWindow.loadURL(`http://localhost:${port}/`);
      mainWindow.webContents.openDevTools();
    }

    // windows
    // const iconPath = `${__dirname}/logo.png`;
    // const tray = new Tray(nativeImage.createFromPath(iconPath));
    // tray.setToolTip("ETA");
    // const contextMenu = Menu.buildFromTemplate([
    //   {
    //     label: "열기",
    //     type: "normal",
    //     click() {
    //       mainWindow.show();
    //     },
    //   },
    //   { label: "닫기", type: "normal", role: "quit" },
    // ]);
    // tray.on("click", () => (mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()));
    // tray.setContextMenu(contextMenu);
    // mainWindow.on("close", (e) => {
    //   if (mainWindow.isVisible()) {
    //     mainWindow.hide();
    //     e.preventDefault();
    //   }
    // });
  }
})();

const NOTIFICATION_TITLE = 'ETA';
const NOTIFICATION_BODY = 'ETA에서 푸시알림을 사용할 수 있습니다.';

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
}

app.on('window-all-closed', () => {
  app.quit();
});
