import React, {Component} from 'react';
import './CustomNavbar.css';
import './About.jsx';
import {Navbar,NavbarToggler,NavbarBrand,Collapse,Nav,NavItem,NavLink,} from 'reactstrap';


export default class Home extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render(){
        return(
            <div>
            <Navbar color="dark" light expand="md">
              <NavbarBrand id="app_name" href="/">The Chatter</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink id="link1" href="https://github.com/GregoryGotlib/Chatter-.git">GitHub</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink id="link2" href="/About">About</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
}