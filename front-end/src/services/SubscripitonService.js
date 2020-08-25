
const REACT_APP_PUBLIC_VAPID_KEY  =  'BC7mkKMujZ2IutY-aSF5W3nCqQEuKl8D2J-8xOGDrN7JHdxTF-sWLHPHWcpwYO2n6kXXKydSJeu6cevQ9DhAZZg'

const convertedVapidKey = urlBase64ToUint8Array(REACT_APP_PUBLIC_VAPID_KEY)


function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}



function sendSubscription(subscription , event) {
    
    return fetch(`//localhost:3030/api/notifications/subscribe`, {
      method: 'POST',
      body: JSON.stringify({subscription , event}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

export function subscribeUser(event) {
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (registration) {
            if (!registration.pushManager) {
                console.log('Push manager unavailable.')
                return
            }

            registration.pushManager.getSubscription().then(function (existedSubscription) {
                if (existedSubscription === null) {
                    console.log('No subscription detected, make a request.')
                    registration.pushManager.subscribe({
                        applicationServerKey: convertedVapidKey,
                        userVisibleOnly: true,
                    }).then(function (newSubscription) {
                        console.log('New subscription added.')
                        sendSubscription(newSubscription , event)
                    }).catch(function (e) {
                        if (Notification.permission !== 'granted') {
                            console.log('Permission was not granted.')
                        } else {
                            console.error('An error ocurred during the subscription process.', e)
                        }
                    })
                } else {
                    console.log('Existed subscription detected.')
                    sendSubscription(existedSubscription , event)
                }
            })
        })
            .catch(function (e) {
                console.error('An error ocurred during Service Worker registration.', e)
            })
    }
}

export const SubscriptionService = {
    subscribeUser
}
