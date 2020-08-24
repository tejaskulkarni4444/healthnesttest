import React, { Component } from 'react';
import './Styles/navbar.css'
import FeedIcon from '@material-ui/icons/FeaturedPlayList'
import CommunityIcon from '@material-ui/icons/Language'
import Logo from '@material-ui/icons/LocalHospital'
import AvatarIcon from '@material-ui/icons/AccountCircle'
import MessageIcon from '@material-ui/icons/ForumOutlined'
import SearchIcon from '@material-ui/icons/Search'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div className="navContainer">
                <div className="navSection left">
                    <div>
                        <Link to="/">
                            <FeedIcon className="navIcons"/>
                            <span className="label navLink">Feed</span>
                        </Link>
                    </div>
                    <div>
                        <CommunityIcon className="navIcons"/>
                        <span className="label navLink">Communities</span>
                    </div>
                </div>
                <div className="navSection center">
                    <Link to="/"><Logo className="navIcons logo"/></Link>
                    <span className="label navLink logo">HealthNest</span>
                </div>
                <div className="navSection right">
                    <FilledInput
                        endAdornment={<InputAdornment position="end"><SearchIcon className="navIcons" style={{color:'#888888'}}/></InputAdornment>}
                        aria-describedby="filled-weight-helper-text"
                        className="navSearch"
                        placeholder="Search"
                    />
                    <MessageIcon className="navIcons"/>
                     <AvatarIcon className="navIcons"/>
                    <span className="label navLink" style={{fontSize:'14px'}}>&#8964;</span>
                </div>
            </div>
        );
    }
}

export default Navbar