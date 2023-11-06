export const showNotification = (attentionStatus: boolean) => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    if (attentionStatus) {
      // TODO: 집중상태를 값으로 받아서 값에 따라 푸시알림 보내기
      const notificationTitle = '현재 집중상태 : 🔥';
      new Notification(notificationTitle, {
        body: '열심히 하고계시네요! 아자아자!',
      }).onclick = () => console.log('Notification Clicked');
    } else {
      const notificationTitle = '현재 집중상태 : 🫵';
      new Notification(notificationTitle, {
        body: '바람한번 쐬고오는 건 어떨까요?',
      }).onclick = () => console.log('Notification Clicked');
    }
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      console.log(permission);
      if (permission === 'granted') {
        new Notification('START ETA', { body: '이제 푸시알림을 받을 수 있습니다.' });
      } else {
        alert('Notification denied');
      }
    });
  }
};
