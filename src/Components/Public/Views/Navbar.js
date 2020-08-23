import React, { Component } from 'react';
import './Styles/navbar.css'

class Navbar extends Component {
    render() {
        return (
            <div className="navContainer">
                <div className="">
                    <span>Feed</span>
                    <span>Communities</span>
                </div>
                <div><span>HealthNest</span></div>
                <div className="">
                    Login
                </div>
            </div>
        );
    }
}

export default Navbar