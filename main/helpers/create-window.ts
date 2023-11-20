import { screen, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import { config } from '../config';

import type { BrowserWindowConstructorOptions, Rectangle } from 'electron';

export default (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
  const key = 'window-state';
  const name = `window-state-${windowName}`;
  const store = new Store<Rectangle>({ name });
  const defaultSize = {
    width: options.width,
    height: options.height,
  };
  let state = {};
  let win;

  const restore = () => store.get(key, defaultSize);

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const browserOptions: BrowserWindowConstructorOptions = {
    ...state,
    ...options,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: true,
      ...options.webPreferences,
    },
  };
  win = new BrowserWindow(browserOptions);
  const loginWindow = new BrowserWindow({
    width: 600,
    height: 600,
    parent: win,
    show: false, // 처음에는 숨김 처리
  });

  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&response_type=code&scope=${config.SCOPE}&access_type=offline`;

  // 사용자 인증을 위한 웹뷰 생성
  loginWindow.loadURL(oauthUrl);

  let authCode = '';
  // 웹뷰에서의 리디렉션을 캡처하여 처리
  loginWindow.webContents.on('will-redirect', (event, url) => {
    if (url.startsWith(config.REDIRECT_URI)) {
      const code = url.split('?')[1].split('=')[1].split('&')[0];
      // loginWindow.webContents.send('authCode', code);
      console.log('will-redirect code : ', code);
      authCode = code;
      loginWindow.webContents.send('codeToMain', code);
      loginWindow.close();
    }
  });

  loginWindow.show(); // 사용자에게 웹뷰를 보여줌

  ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg); // "ping" 출력
    event.reply('authCode', authCode);
  });

  ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg); // "ping" 출력
    event.returnValue = 'pong';
  });

  win.on('close', saveState);

  return win;
};
