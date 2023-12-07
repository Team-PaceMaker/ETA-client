import { app, Menu, Tray, systemPreferences, Notification } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import { config } from './config';
import { createWindow } from './helpers';
import fs from 'fs';
import axios from 'axios';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let tray = null;

(async () => {
  await app
    .whenReady()
    .then(() => {
      process.env.SERVER_URL = config.SERVER_URL;
      // systemPreferences.askForMediaAccess('camera');
      // systemPreferences.getMediaAccessStatus('camera');
    })
    .then(makeWindow);

  async function makeWindow() {
    const mainWindow = createWindow('main', {
      width: 1200,
      height: 720,
      center: true,
    });

    if (isProd) {
      app.commandLine.appendSwitch('ignore-certificate-errors'); // SSL 인증서 오류 무시 (개발용)
      app.commandLine.appendSwitch('allow-insecure-localhost'); // 로컬호스트에 대한 비보안 연결 허용 (개발용)
      await mainWindow.loadURL('app://./index.html');
    } else {
      const port = process.argv[2];
      await mainWindow.loadURL(`http://localhost:${port}/`);
      // mainWindow.webContents.openDevTools();
    }

    // 창 닫기 이벤트 설정
    mainWindow.on('close', (event) => {
      event.preventDefault();
      mainWindow.hide();
    });

    // 메뉴에서 우클릭 종료 시 어플리케이션 종료
    app.on('before-quit', () => {
      app.exit();
    });

    app.on('activate', () => {
      // 메뉴에서 아이콘 클릭 시 다시 창 띄우기
      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
    });

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '창 열기',
        click() {
          if (!mainWindow.isVisible()) {
            mainWindow.show();
          }
        },
      },
      {
        label: '가리기',
        click() {
          mainWindow.hide();
        },
      },
      {
        label: '프로그램 종료',
        click() {
          app.exit();
        },
      },
    ]);

    try {
      tray = new Tray(`${__dirname}/ETA_dark.png`);
      tray.setContextMenu(contextMenu);
    } catch (err) {
      axios({
        method: 'GET',
        url: 'https://etas3bucket.s3.ap-northeast-2.amazonaws.com/ETA_image/ETA_dark.png',
        responseType: 'stream', // 스트림 형태로 받음
      })
        .then((response) => {
          const imagePath = path.join(__dirname, 'ETA_dark.png'); // 저장할 경로
          const imageStream = fs.createWriteStream(imagePath);
          response.data.pipe(imageStream);

          imageStream.on('finish', () => {
            tray = new Tray(`${__dirname}/ETA_dark.png`);
            tray.setContextMenu(contextMenu);
          });
        })
        .catch((error) => {
          throw Error('이미지 다운로드 실패:', error);
        });
    }

    // 다크모드 변경 감지
    // nativeTheme.on('updated', () => {
    //   const updatedSystemTheme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
    //   tray.setImage(`${__dirname}/ETA_${updatedSystemTheme}.png`);
    // });
  }
  // const notification = new Notification({
  //   title: '현재 집중상태 : 🔥',
  //   body: '열심히 하고계시네요! 아자아자!',
  // });

  // notification.show();

  // notification.on('click', () => {
  //   console.log('Notification Clicked');
  // });
})();

app.setAsDefaultProtocolClient('eta');

app.on('window-all-closed', () => {
  app.quit();
});
