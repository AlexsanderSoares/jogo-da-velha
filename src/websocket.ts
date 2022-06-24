import { createMatchController } from "./application/useCases/CreateMatch/";
import { exitMatchController } from "./application/useCases/ExitMatch";
import { kickoutMatchController } from "./application/useCases/KickoutMatch";
import { playerMoveController } from "./application/useCases/PlayerMove";
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
        else if(!data.user)
            emitSocketError(socket, "Username is required");
        else{
            const match = await updateMatchController.handle(data.roomId, {player2: {name: data.user, socket_id: socket.id}})

            if(match){
                socket.join(data.roomId);

                io.to(data.roomId).emit("user_join_room_success", {
                    user: data.user,
                    room: match,
                });
            }
        }
        
    });



    socket.on('disconnecting', async () => {
        
        const matchExited = await exitMatchController.handle(socket.id);

        if(matchExited){
            socket.leave(matchExited._id.toString());
            io.to(matchExited._id.toString()).emit('player_disconnected', matchExited);
        }
    });



    socket.on('quit_room', async () => {
        
        const matchExited = await exitMatchController.handle(socket.id);

        if(matchExited){
            socket.leave(matchExited._id.toString());
            io.to(matchExited._id.toString()).emit('player_quit', matchExited);
        }
    });

    socket.on('kickout_room', async () => {
        
        const kickoutMatch = await kickoutMatchController.handle(socket.id);

        if(kickoutMatch){

            const playerSockets = await io.in(kickoutMatch.player2.socket_id.toString()).fetchSockets();

            const player2Socket = playerSockets.find(socket => socket.id === kickoutMatch.player2.socket_id); 

            player2Socket.leave(kickoutMatch._id.toString());

            kickoutMatch.player2 = null;

            io.to(kickoutMatch._id.toString()).emit('kickout_room', kickoutMatch);

        }

    });

    socket.on('player_move', async (data) => {

        const match = await playerMoveController.handler(socket.id, {column: data.column, line: data.line});

        if(match)
            io.to(match._id.toString()).emit("player_move", match);

    });

    

});