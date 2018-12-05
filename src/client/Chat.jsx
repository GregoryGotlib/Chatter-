import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardFooter,Button} from 'reactstrap';
import './Chat.css';
export default class Chat extends Component {

    constructor(props){
        super(props);

        this.state = {
            Messages:[],
            Message:'',
            usersList:[]
        };


        this.props.socket.on('RECEIVED_MESSAGE',function(info){
            console.log('I received a message',info)
            ReceivedHandler(info)
        });

        const ReceivedHandler = (info)=>{
            var NewMsgList = this.state.Messages.slice()
            NewMsgList.push(info)
            this.setState({Messages: NewMsgList});
                             
        }

    }
   

    ChangeHandler = (event)=>{
        this.setState({Message:event.target.value})
    }

    MessageHandler = (event)=>{
        event.preventDefault();
        this.props.socket.emit('SEND_MESSAGE', {
            sender: this.props.User.name,
            Message: this.state.Message
        });
        this.setState({Message: ''});
    }


    CreateConnectedUsersList = (users)=>{
        var usersList=[]
        for(var val in users)
        {   
            usersList.push(users[val].name)
            console.log(usersList)
        }            
        return usersList
    }
    

    render() {
        const Users = this.CreateConnectedUsersList(this.props.Users)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                    <Card id="userscard">
                            <CardBody>
                                <CardTitle id="cardTitle">Connected Users</CardTitle>
                                <hr/>  
                                <div className="users">{Users.map(data=>{
                                    return(
                                        <div id="setUser">{data}</div>
                                    )
                                })}
                                </div>   
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                        <Card id="card">
                            <CardBody>
                                <CardTitle id="cardTitle">Chatter - Wellcome {this.props.User.name}</CardTitle>
                                <hr/>
                                <div className="messages">
                                    {this.state.Messages.map(info => {
                                        return (
                                            <div id="sender">{info.sender}: {info.Message}</div>
                                        )
                                    })}
                                </div>
                            </CardBody>
                            <CardFooter>
                                <input id="input" type="text" placeholder="Message" className="form-control" value={this.state.Message} onChange={this.ChangeHandler}/>
                                <br/>
                                <Button id="button" onClick={this.MessageHandler} color="success">Send</Button>
                                <Button id="logoutbutton" onClick={this.props.logout} color="danger" >Logout</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        );
      }
}