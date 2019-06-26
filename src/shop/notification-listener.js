self.addEventListener('notificationclick', ({ action, notification }) => {
  let url;

  if (action === 'checkOrder') url = `/#order?=${notification.data}`;
  else url = 'https://maps.google.com/maps?q=guldentopveldwinkel&t=&z=17&ie=UTF8&iwloc=&output=embed';

  self.clients.openWindow(url);
});
