import { createMatchController } from "./application/useCases/CreateMatch/";
import { exitMatchController } from "./application/useCases/ExitMatch";
import { updateMatchController } from "./application/useCases/UpdateMatch";
import { io } from "./http";

io.on("connection", socket => {

    const emitSocketError = (socket, error) => {
        socket.emit("user_join_room_error", {
            error
        });
    }

    socket.on('create_room', async (data) => {

        const roomId = await (await createMatchController.handle({name: data.user, socket_id: socket.id})).toString();

        socket.join(roomId);

        socket.emit('create_room_id_success', {
            roomId: roomId,
        });

    });

    socket.on('join_room', async (data) => {

        if(!data.roomId)
            emitSocketError(socket, "Invalid Room ID");
        
        if(!data.user)
            emitSocketError(socket, "Username is required");

        const match = await updateMatchController.handle(data.roomId, {player2: {name: data.user, socket_id: socket.id}})

        if(match)
            socket.join(data.roomId);

        io.to(data.roomId).emit("user_join_room_success", {
            user: data.user,
            room: match,
        });
    });

    socket.on('disconnecting', async () => {
        
        const exited = await exitMatchController.handle(socket.id);

        if(exited)
            socket.emit('player_disconnected');
    });

});