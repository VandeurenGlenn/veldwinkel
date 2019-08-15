self.addEventListener('notificationclick', ({ action, notification }) => {
  let url;

  if (action === 'checkOrder') url = `/#order?=${notification.data}`;
  else url = 'https://www.google.com/maps/dir/50.9804131,4.7489457/@50.980413,4.748946,17z?hl=en-GB';

  self.clients.openWindow(url);
});
