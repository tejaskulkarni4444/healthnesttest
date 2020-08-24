import React, { Component } from 'react';
import AvatarIcon from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'
import '../../Components/Public/Views/Styles/main.css'

const styles = theme =>({
    container:{
        padding: '15px'
    },
    profilePic:{
        fontSize: '60px'
    },
    userInfo:{
        padding: '15px',
        width: '65%',
        display: 'inline-block',
        '@media (max-width: 480px)':{ 
            display: 'block',
            width: 'auto',
            textAlign: 'center'
        }  
    },
    profilePicContainer:{
        borderRight: 'solid 1px #000',
        padding: '15px',
        width: '15%',
        display: 'inline-block',
        '@media (max-width: 480px)':{ 
            display: 'block',
            margin: 'auto',
            border: '0',
        }  
    }
})

class Profile extends Component {
    state = {
        userInfo: {}
    }
    componentDidMount() {
        const userInfo = localStorage.getItem('userInfo')
        if(userInfo.length !== 0){
            this.setState({userInfo: JSON.parse(userInfo)})
        }
    }
    render() {
        const { classes } = this.props
        const { userInfo } = this.state
        return (<React.Fragment>
            <div className={classes.container}>
                <h2 style={{textAlign: 'center'}}>Profile</h2>
                <div className={classes.profilePicContainer}>
                    <AvatarIcon className={classes.profilePic}/>
                </div>
                <div className={classes.userInfo}>
                    <div><label>Name:</label> <span>{userInfo.name}</span></div>
                    <div><label>Username:</label><span>{userInfo.username}</span></div>
                    <div><label>Email:</label><span>{userInfo.email}</span></div>
                    <div><label>Relation:</label><span>{userInfo.relation}</span></div>
                </div>
            </div>
            {Object.keys(userInfo).length === 0 && <h4>No Information Available</h4>}
            </React.Fragment>);
    }
}

export default withStyles((styles))(Profile)