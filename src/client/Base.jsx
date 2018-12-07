import React, { Component } from 'react';
import io from "socket.io-client";
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import './Base.css';


export default class Base extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
           User:null,
           Users:[],
           socket:null,
        };          
    }
        
    // Setting data first and then rendering
    componentDidMount(){
        const socket = io('http://localhost:5000/')
        this.setState({socket})
    }
    

    SetUser = (User)=>{
        this.state.socket.emit('USER_CONNECTED', User);
        this.setState({User:User})

        this.state.socket.on('UPDATED_USERS_LIST',function(data){
            this.setState({Users:data})
           // console.log(this.state.Users)
        }.bind(this));
    }

    LogOut = ()=>{
        this.state.socket.emit('LOGOUT');
        this.setState({User:null});

        this.state.socket.on('USER_DISCONNECTED',function(users){
            this.setState({Users:users})
            console.log('after disconnection',this.state.Users)
        }.bind(this));
    }
    
    render() {
		return (
			<div className="container">
				{
					!this.state.User ?	
					<Login socket={this.state.socket} SetUser={this.SetUser} />
					:
					<Chat socket={this.state.socket} User={this.state.User} Users={this.state.Users}  logout={this.LogOut}/>
				}
			</div>
		);
	}
}

