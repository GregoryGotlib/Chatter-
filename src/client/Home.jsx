import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Jumbotron ,Button} from 'reactstrap';
import './Home.css';

export default class Home extends Component{
    render(){
        return(
        <div className="bg">
            <div className="container">
                <Jumbotron id="jum">
                    <h2 id="h2">
                        Wellcome to The Chatter application!
                    </h2>
                    <br/>
                    <Link to="/Base">
                        <div className="btnp">
                        <hr className="my-8" />
                            <Button color="info">
                                Start Chatting 
                            </Button>
                        </div>
                    </Link>
                </Jumbotron>
            </div>
        </div>
        )
    }
}