
self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('New notification', data)
  const options = {
    body: data.body,
    icon: 'https://i.ibb.co/CPMf2VZ/mstile-72x72.png' 
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})