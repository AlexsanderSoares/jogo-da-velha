const socket = io();

socket.on("room_id", data => {
    console.log(data);
});

socket.on("user_join_room_success", data => {
    console.log(data);
});

socket.on("user_join_room_error", data => {
    console.log(data.error);
});

socket.on("create_room_id_success", data => {
    console.log(data);
});

socket.on("player_disconnected", data => {
    console.log("O adversário desconectou");
    console.log(data);
});

socket.on("player_quit", data => {
    console.log("O adversário saiu da sala");
    console.log(data);
});

socket.on("kickout_room", data => {
    console.log("O adversário foi expulso da sala");
    console.log(data);
});

function createRoom(){
    socket.emit("create_room", {user: "Alex"});
}

function joinRoom(){
    socket.emit("join_room", {
        roomId: document.getElementById("room").value,
        user: document.getElementById("name").value
    });
}

function quitRoom(){
    socket.emit("quit_room");
}

function kickoutRoom(){
    socket.emit("kickout_room");
}

function playerMove(){
    socket.emit("player_move", {column: 1, line: 1});
}