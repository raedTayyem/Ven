import io from 'socket.io-client';

const BASE_URL =
    process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030';

let socket;



function setup() {
    socket = io(BASE_URL);
}

function on(eventName, cb) {
    socket.on(eventName, cb);
}

function off(eventName, cb) {
    socket.off(eventName, cb);
}

function emit(eventName, data) {
    socket.emit(eventName, data);
}


export const SocketService = {
    setup,
    on,
    off,
    emit
};