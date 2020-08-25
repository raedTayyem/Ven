const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
};

const eventRoutes = require('./api/event/event.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const notificationRoutes = require('./api/notification/notification.routes')
const connectSockets = require('./api/socket/socket.routes')



// routes
app.use('/api/event', eventRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use(`/api/notifications/subscribe`, notificationRoutes)
connectSockets(io)


const logger = require('./service/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});



