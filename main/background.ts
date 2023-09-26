import { app, Notification } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady().then(makeWindow).then(showNotification);

  async function makeWindow() {
    const mainWindow = createWindow("main", {
      width: 1200,
      height: 720,
    });

    if (isProd) {
      await mainWindow.loadURL("app://./home.html");
    } else {
      const port = process.argv[2];
      await mainWindow.loadURL(`http://localhost:${port}/home`);
      // mainWindow.webContents.openDevTools();
    }
  }
})();

const NOTIFICATION_TITLE = "ETA";
const NOTIFICATION_BODY = "ETA에서 푸시알림을 사용할 수 있습니다.";

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
}

app.on("window-all-closed", () => {
  app.quit();
});
