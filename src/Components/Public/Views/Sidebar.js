import React from 'react'
import './Styles/main.css'
import AvatarIcon from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import BookmarksIcon from '@material-ui/icons/Bookmarks'
import TvIcon from '@material-ui/icons/Tv'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { Link } from 'react-router-dom'

const styles = theme =>({
    avatarIcon: { 
        color: '#b5b5b5', 
        fontSize: '45px',
        margin: '15px',
        display: 'inline-block',
        '@media (max-width: 900px)':{display: 'block', margin: 'auto'}
    },
    userName:{ 
        textDecoration: 'none',
        color:'#000',
        lineHeight:'24px', 
        verticalAlign: 'top', 
        display: 'block'
    },
    userInfoContainer: {
        display: 'inline-block',
        verticalAlign: 'top',
        marginTop: '15px', fontSize: '15px',
        '@media (max-width: 900px)':{display: 'block', textAlign: 'center'}
    },
    sideIcons:{background: 'white',padding: '5px'},
    sideLabels:{
        margin: '10px',
        lineHeight: '30px',
        verticalAlign: 'top',
    },
    sideBarLinks:{
        '@media (max-width: 670px)':{display: 'none'}
    }
})

var Sidebar = (props) => {
    const { classes } = props
    return(<React.Fragment>
        <div className={"paperDiv row"}>
                <Link to="/profile"><AvatarIcon className={classes.avatarIcon} /></Link>
                <div className={classes.userInfoContainer}>
                    <Link to="/profile"><span className={classNames("label", classes.userName)}>Tejas</span></Link>
                    <span className={classNames("label", classes.userRelation, "greenText")} style={{textTransform:"uppercase"}}>Patient's friend</span>
                </div>
                <div className="row hide">&nbsp;</div>
            </div>
            <div className="row hide">&nbsp;</div>
            <hr className="hide"/>
            <div className="row hide">&nbsp;</div>
            <div className={classes.sideBarLinks}>
                <div className="row label grayText">Library</div>
                <div className="row label">
                    <BookmarksIcon className={classes.sideIcons} />
                    <label className={classes.sideLabels}>My Bookmarks</label>
                </div>
                <div className={"row label"}>
                    <TvIcon className={classes.sideIcons}/>
                    <label className={classes.sideLabels}>News &amp; Articals</label>
                </div>
                <div className={"row label"}>
                    <QuestionAnswerIcon className={classes.sideIcons}/>
                    <label className={classes.sideLabels}>FAQs</label>
                </div>
                <div className={"row label"}>
                    <DateRangeIcon className={classes.sideIcons}/>
                    <label className={classes.sideLabels}>Events</label>
                </div>
            </div>
        </React.Fragment>
    )
}

export default (withStyles(styles)(Sidebar))