module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('added new review' , ()=>{
            io.emit('new review')
        })
        socket.on('change like' , ()=>{
            io.emit('new like')
        })
    })
}

