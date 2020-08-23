import React, { Component } from 'react'
import './Views/Styles/main.css'
import PostWidget from './Views/PostWidget'
// import { connect } from 'react-redux'

// function mapStateToProps(state) {
//     return {

//     }
// }

class Home extends Component {
    state = {
        widgetAction:{},
        postFeed: {}
    }
    
    componentDidMount(){
        const existingPosts = localStorage.getItem('postFeed') ? JSON.parse(localStorage.getItem('postFeed')) : []
        if(existingPosts) this.setState({postFeed: existingPosts})
    }
    render() {
        return (
            <div className="homeContainer">
                <div className="sideBar paperDiv">sidebar</div>
                <div className="postFeed">
                    <PostWidget actions={this.state.widgetAction}/>
                </div>
            </div>
        )
    }
}

export default Home