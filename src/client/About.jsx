import React, {Component} from 'react';
import { Jumbotron,Button } from 'reactstrap';
import './About.css';

export default class About extends Component{
    render(){
        return(
            <div className="containera">
                <Jumbotron id="jumb">
                    <h1 id="p">Hello and Wellcome!</h1>
                    <hr/>
                    <p className="p1">This is real-time Chat application, I made it while learning Web Development technologies.
                    <br/>
                     I developed it with React,Nodejs and Socket io.
                    </p>
                    <p className="p1">You can share your opinion with me via email, GregoryGotlib@gmail.com.</p>
                    <p className="p3">
                    <Button id="back_b" color="info" href="/">Go back</Button>
                    </p>
                </Jumbotron>
            </div>
            )
    }
}