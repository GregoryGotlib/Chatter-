// require express module
const express = require('express');

// create express application
const app = express();

//const server = require('http').Server(app);

app.use(express.static(__dirname + '/public'))


var PORT = process.env.PORT || 5000
server = app.listen(PORT, function(){
    console.log('Server connected to port:',PORT)
})
// require socket.io module
var socket = require('socket.io');


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

    socket.on('disconnect', ()=>{
		if('User' in socket){
			delete Users[socket.User.name]
            io.emit('USER_DISCONNECTED', Users)
            console.log("balalal")
		}
	})
    
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