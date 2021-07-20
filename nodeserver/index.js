

//node server which will handle socket io connections
const io=require("socket.io")(8000,{
    cors:{
        origin:'*',

    }
});

const users={};

io.on('connection',socket =>{
    //if any user joins, let other users connected to the server know!
   socket.on('new-user-joined', names=>{
      // console.log("new user",names);
       users[socket.id]= names;
       socket.broadcast.emit('user-joined',names);
   } )
  //if someone send a message, broadcast to the other users
   socket.on('send',message=>{
       socket.broadcast.emit('receive',{message: message, names: users[socket.id]})
   })
//if someone leave the chats, let others know
   socket.on("disconnect", message => {
     socket.broadcast.emit('left', users[socket.id]);
     delete users[socket.id];
  });

})