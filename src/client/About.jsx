import React, {Component} from 'react';
import { Jumbotron,Button } from 'reactstrap';
import './About.css';

export default class About extends Component{
    render(){
        return(
            <div className="container">
                <Jumbotron id="jum">
                    <h1 id="display-5">Hello and Wellcome!</h1>
                    <hr className="my-2" />
                    <p className="lead">This is a simple Chat application, I made it in my free time to learn Web Development technologies.
                    <br/>
                     I developed it with React,Nodejs and Socket io.
                    </p>
                    <p className="lead">You can share your opinion with me via email, Gregory.Gotlib@gmail.com.</p>
                    <p id="end">Please feel free to share and enjoy your stay.</p>
                    <p className="lead">
                    <Button id="back_b" color="info" href="/">Go back</Button>
                    </p>
                </Jumbotron>
            </div>
            )
    }
}