import { createMatchController } from "./application/useCases/CreateMatch/";
import { io } from "./http";

io.on("connection", socket => {

    const emitSocketError = (socket, error) => {
        socket.emit("user_join_room_error", {
            error
        });
    }

    socket.on('create_room', async (data) => {

        const lastId = await createMatchController.handle();

        socket.join(lastId);

        socket.emit('room_id', {
            roomId: lastId,
        });
    });

    socket.on('join_room', data => {

        if(!data.roomId)
            emitSocketError(socket, "Invalid Room ID");
        
        if(!data.user)
            emitSocketError(socket, "Username is required");

        socket.join(data.roomId);

        io.to(data.roomId).emit("user_join_room_success", {
            user: data.user
        });
    });

});