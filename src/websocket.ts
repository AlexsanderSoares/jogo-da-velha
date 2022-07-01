import { createMatchController } from "./application/useCases/CreateMatch/";
import { exitMatchController } from "./application/useCases/ExitMatch";
import { kickoutMatchController } from "./application/useCases/KickoutMatch";
import { playerMoveController } from "./application/useCases/PlayerMove";
import { startMatchController } from "./application/useCases/StartMatch";
import { jonRoomController } from "./application/useCases/JoinRoom";
import { io } from "./http";
import { finishMatchController } from "./application/useCases/FinishMatch";

io.on("connection", socket => {



    const emitSocketError = (socket, error) => {
        socket.emit("error", {
            error
        });
    }

    socket.on('create_room', async (data) => {

        const match = await createMatchController.handle({name: data.user, socket_id: socket.id});

        socket.join(match._id);

        socket.emit('create_room_id_success', {
            match
        });

    });


    socket.on('join_room', async (data) => {

        try{

            const match = await jonRoomController.handle(data.roomId, {player2: {name: data.user, socket_id: socket.id}})

            if(match){
                socket.join(data.roomId);

                io.to(data.roomId).emit("user_join_room_success", {
                    user: data.user,
                    room: match,
                });
            }

        }catch(err){

            emitSocketError(socket, err.error);

        }

        
    });



    socket.on('disconnecting', async () => {
        
        try{

            const matchExited = await exitMatchController.handle(socket.id);

            if(matchExited){
                socket.leave(matchExited._id.toString());
                io.to(matchExited._id.toString()).emit('player_disconnected', matchExited);
            }

        }catch(err){

            emitSocketError(socket, err.error);

        }
        
    });



    socket.on('quit_room', async () => {
        
        try{

            const matchExited = await exitMatchController.handle(socket.id);

            if(matchExited){
                socket.leave(matchExited._id.toString());
                io.to(matchExited._id.toString()).emit('player_quit', matchExited);
            }

        }catch(err){

            emitSocketError(socket, err.error);

        }

    });

    socket.on('kickout_room', async () => {
        
        try{

            const kickoutMatch = await kickoutMatchController.handle(socket.id);

            if(kickoutMatch){

                const playerSockets = await io.in(kickoutMatch.player2.socket_id.toString()).fetchSockets();

                const player2Socket = playerSockets.find(socket => socket.id === kickoutMatch.player2.socket_id); 

                player2Socket.leave(kickoutMatch._id.toString());

                kickoutMatch.player2 = null;

                io.to(kickoutMatch._id.toString()).emit('kickout_room', kickoutMatch);

            }

        }catch(err){

            emitSocketError(socket, err.error);

        }

    });

    socket.on('start_match', async () => {

        try{

            const startMatch = await startMatchController.handle(socket.id); 

            io.to(startMatch._id.toString()).emit('start_match', startMatch);

        }catch(err){

            emitSocketError(socket, err.error);

        }

    });

    socket.on('player_move', async (data) => {

        try{

            const matchPlayerMove = await playerMoveController.handler(socket.id, {column: data.column, line: data.line});

            const matchFinish = await finishMatchController.handle(matchPlayerMove._id.toString());

            if(!matchFinish.start)
                io.to(matchFinish._id.toString()).emit("player_move", matchFinish);
            else
                io.to(matchPlayerMove._id.toString()).emit("player_move", matchPlayerMove);
        
        }catch(err){

            emitSocketError(socket, err.error);

        }

    });

});