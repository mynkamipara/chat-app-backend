import { insertMessageConversation } from "./insertDBScoket";

var Global: any = require('../../global');

let socket = Global.io.sockets;
let activeUsers = new Map();

socket.on('connection', function (socket) {
  const getUserKeys = (socketId) => {
    for (const [key, value] of activeUsers.entries()) {
      if (value === socketId) return key;
    }
  }

  socket.on('chatRoomAddUser', (userId) => {
    activeUsers.set(userId, socket.id);
    socket.broadcast.emit("chatRoomGetUsers", Array.from(activeUsers));
  })

  socket.on('sendPrivateMessage', (data) => {
    const sendMesageToUser = activeUsers.get(data.receiver);

    insertMessageConversation(socket.user, data.receiver, data.text);

    if (sendMesageToUser) {
      socket.to(sendMesageToUser).emit(`getPrivateMessage`, {
        sender: data.sender,
        receiver: data.receiver,
        message: data.text
      })
    }
  })

  socket.on('disconnect', () => {
    activeUsers.delete(getUserKeys(socket.id));
    socket.broadcast.emit("chatRoomGetUsers", Array.from(activeUsers));
  })

})
