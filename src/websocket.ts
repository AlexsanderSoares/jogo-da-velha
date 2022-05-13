import { createMatchController } from "./application/useCases/CreateMatch/";
import { io } from "./http";

io.on("connection", socket => {

    const emitSocketError = (socket, error) => {
        socket.emit("user_join_room_error", {
            error
        });
    }

    socket.on('create_room', async (data) => {

        const lastId = await (await createMatchController.handle()).toString();

        socket.join(lastId);

        socket.emit('create_room_id_success', {
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
            user: data.user,
            roomId: data.roomId,
        });
    });

});