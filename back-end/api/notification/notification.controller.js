const moment = require('moment')
const dotenv = require('dotenv')
const webpush = require('web-push');
const cron = require('node-cron');
dotenv.config();



const PUBLIC_VAPID_KEY = 'BC7mkKMujZ2IutY-aSF5W3nCqQEuKl8D2J-8xOGDrN7JHdxTF-sWLHPHWcpwYO2n6kXXKydSJeu6cevQ9DhAZZg'
const PRIVATE_VAPID_KEY = 'h3f4iWLKPw25KbWyO6vqvCxsT2IA431SUMw1_JlHxAY'
const WEB_PUSH_CONTACT = 'mailto:liathaf@gmail.com'

webpush.setVapidDetails(WEB_PUSH_CONTACT, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)


async function sensNot(req, res) {

    const { subscription, event } = req.body;

    var twoDaysBeforeEvent = moment.unix(event.startAt).subtract(1, 'days').date()
    const monthOfTheEvent = moment.unix(event.startAt).month() + 1;
    const pattern = `0 30 8 ${twoDaysBeforeEvent} ${monthOfTheEvent} *`
    console.log(pattern)

    try {
        
        await webpush.sendNotification(subscription, JSON.stringify({
            title: 'Venyou!',
            body: `thank you for joining ${event.title}`,
        }));
        await cron.schedule(pattern, () => {
            webpush.sendNotification(subscription, JSON.stringify({
                title: 'Venyou!',
                body: `${event.title} started in 1 day! go check who's coming`,
            }));
        });
        console.log('the notification was sent');
        res.status(200).json({ 'success': true });
    } catch (err) {
        console.log(err)
    }


}

module.exports = {
    sensNot
}






