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
        const Users  = this.CreateConnectedUsersList(this.props.Users)
        return (
            <div className="chat_container">
                    <Card id="userscard">
                        <CardBody>
                            <CardTitle id="users_title">Connected Users</CardTitle>
                            <hr id="hr"/>  
                            <div className="users">{Users.map(data=>{
                                return(
                                    <ul>
                                        <li>
                                            <div id="data">{data}</div>
                                        </li>
                                    </ul>
                                )
                            })}
                            </div>   
                        </CardBody>
                    </Card>
                    <Card id="chat_card">
                        <CardBody id="chat_card_body">
                            <CardTitle id="chat_card_title">Chatter - Wellcome {this.props.User.name}</CardTitle>
                            <hr id="hr"/>
                            <div className="messages">
                                {this.state.Messages.map(info => {
                                    return (
                                        <div>
                                        <div id="sender">{info.sender}: <div id="message">{info.Message}</div></div>
                                        <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardBody>
                            <CardFooter id="chat_card_footer">
                                <input id="input" type="text" placeholder="Message" className="form-control" value={this.state.Message} onChange={this.ChangeHandler}/>
                                <br/>
                                <div className="buttons">
                                    <Button id="button" onClick={this.MessageHandler} color="success">Send</Button>
                                    <Button id="logoutbutton" onClick={this.props.logout} color="danger" >Logout</Button>
                                </div>
                            </CardFooter>
                    </Card>
            </div>
        );
      }
}