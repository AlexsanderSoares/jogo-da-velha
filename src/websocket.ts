import { io } from "./http";

io.on("connection", socket => {
    socket.join(socket.id);

    socket.on('create_room', data => {
        console.log('create_room');
    });

    socket.on('join_room', data => {
        console.log('join_room');
    });
    
});