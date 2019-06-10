self.addEventListener('notificationclick', ({ action, notification }) => {
  let url;

  if (action === 'checkOrder') url = `/#order?=${notification.data}`;
  else url = '/#info';

  self.clients.openWindow(url);
});
