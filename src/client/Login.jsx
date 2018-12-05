import React, { Component } from 'react';
import {Card,CardTitle,Button,Jumbotron} from 'reactstrap';
import './Login.css';

export default class Login extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	NickName:"",
	  	ErrorMsg:""
	  };
	}

	CheckUser = ({User, isUser})=>{
		if(isUser){
			this.error("This nick name is taken! try again..")
        }
        else{
			this.error("")
			this.props.SetUser(User)
		}
	}

	SubmitHandler = (event)=>{
        event.preventDefault()
        console.log(this.state.NickName)
		this.props.socket.emit('VERIFY_USER', this.state.NickName, this.CheckUser)
	}

	ChangeHandler = (event)=>{
        console.log(event.target.value)
		this.setState({NickName:event.target.value})
	}

	error = (error)=>{

		this.setState({ErrorMsg:error})
	}

	render() {
		return (
			<div className="login">
				<form onSubmit={this.SubmitHandler} className="login-form" >
					<Jumbotron id="jum" body inverse color="info">
						<h1 id="h1">Please provide nick name</h1>
						<hr className="my-8" />
						<span>
                        <input
                            ref={(input)=>{ this.textInput = input }} 
                            type="text"
                            id="nickname"
                            value={this.state.NickName}
                            onChange={this.ChangeHandler}
                            placeholder={'nick name?'}
                            />
                    	</span> 
						<div className="errormsg">{this.state.ErrorMsg ? this.state.ErrorMsg:null}</div>
						<Button id="add_b" color="success">Add nick name</Button>
					</Jumbotron>
				</form>
			</div>
		);
	}
}