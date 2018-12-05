// require express module
const express = require('express');
const path = require('path');
// create express application
const app = express();

const PORT = process.env.PORT || 3222;
const server = require('http').Server(app);

app.user(express.static(__dirname + '/../../build'))

 server.listen(PORT, function(){
    console.log('Server is now running on port:',PORT)
});

// require socket.io module
const socket = require('socket.io');


// create socket application 
const io = socket(server);

let Users = {  };

io.on('connection',(socket)=>{
    console.log('Made client connection with socket:',socket.id);

    socket.on('SEND_MESSAGE',function(info,){
            io.sockets.emit('RECEIVED_MESSAGE',info);    
    });

    socket.on('VERIFY_USER',function(NickName,callback){
        if(ValidateUser(Users,NickName)){
            //console.log('IM NOT verified!')
            callback({User:null,isUser:true})
        }
        else{
            //console.log('IM verified!:',NickName)
            callback({User:{name:NickName},isUser:false})
        }
    });

    socket.on('USER_CONNECTED',function(info){
        Users = AddNewUser(Users,info)
        socket.User = info
        socket.Users=Users
        //console.log(Users)
        io.sockets.emit('UPDATED_USERS_LIST',Users)
    });

    socket.on('LOGOUT',function(){
        console.log(socket.User.name,'disconnected!')
        delete Users[socket.User.name]
        
        io.sockets.emit('USER_DISCONNECTED',Users)
    });
    
});

// This function checks if the nick name is in the Users list
function ValidateUser(Users,NickName){
    //console.log('I am in the ValidateUser!')
    return NickName in Users
}


// This function adds new user to Users object list
function AddNewUser(Users,User){
    let NewUsersList = Object.assign({},Users)
    NewUsersList[User.name] = User
    return NewUsersList
}