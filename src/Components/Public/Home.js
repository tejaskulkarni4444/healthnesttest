import React, { Component } from 'react'
import './Views/Styles/main.css'
import PostWidget from './Views/PostWidget'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {postAction} from '../../Redux/Actions/postWidgetActions'
import AvatarIcon from '@material-ui/icons/AccountCircle'
import Select from '@material-ui/core/Select'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Sidebar from './Views/Sidebar'

function mapStateToProps(state) {
    return { postInfo: state.postActReducer}
}
const mapDispatchToProps = dispatch => ({
    postAction: (value) => dispatch(postAction(value))
})
    
const styles = theme =>({
    topicTags:{
        display: 'inline-block',
        padding: '5px 10px',
        width: '65px',
        color: '#20af8e',
        backgroundColor: 'transparent',
        border: 'solid 1px #c5c0c0',
        borderRadius: '20px',
        margin: '10px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '12px',
        textAlign: 'center'
    },
    isSelectedTopic:{ backgroundColor: '#a3f9d5', borderColor: '#20af8e' },
    topicDropdown:{
        padding: '0 10px',
        width: 'auto',
        "&::before":{ borderBottom: '0'},
        "&::after":{ borderBottom: '0'},
        "&:active":{ borderBottom: '0'},
        "&:hover":{ borderBottom: '0'},
        "& select":{ paddingRight: '5px !important'}
    },
    avatarIcon: { 
        color: '#b5b5b5', 
        fontSize: '50px',
        margin: '0px 10px 10px 0',
        display: 'inline-block'
    },
    feedImage:{ width: '100%'},
    post:{ padding: '15px' },
    filterTags: { 
        display: 'flex',
        '@media (max-width: 785px)':{ display: 'inline-block'}
    },
    postOptionDropdown:{
        boxShadow: '-1px 0px 18px #888888',
        padding: '5px',
        maxWidth: '25%',
        position: 'absolute',
        backgroundColor: '#fff',
        right: '20%',
        '@media (max-width: 900px)':{  right: '1%'}
    },
    postOptions: { 
        display: 'block',
        padding: '5px',
        cursor: 'pointer',
        textAlign: 'center',
        "&:hover":{ backgroundColor: '#888888'}
    },
    userName:{ lineHeight:'24px', verticalAlign: 'top', display: 'block'},
    postTags: { marginRight: '10px'}
})

class Home extends Component {
    state = {
        widgetAction:{},
        postFeed: [],
        topics: ['All Posts', 'News', 'Diet', 'LifeStyle', 'Symptoms', 'Treatment', 'Misc'],
        topicFilter: 'All Posts',
        filteredFeed: [],
        canvasRendered: [],
        prevFeedState: [],
        optionsDropdownOpen: { id: 100000 , open: false}
    }
    
    componentDidMount(){
        const existingPosts = localStorage.getItem('postFeed') ? JSON.parse(localStorage.getItem('postFeed')) : []
        const userInfoExists =  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('postFeed')) : ''
        if(!userInfoExists){
            const info = { name: "Tejas", username:"tejask", email:"tejas@test.com", relation: "Patient's relative" }
            localStorage.setItem('userInfo', JSON.stringify(info))            
        }
        this.setState({prevFeedState: this.state.postFeed})
        if(existingPosts.length !== 0) {
            this.setState({
                postFeed: existingPosts
            },() => {
                this.props.postAction(this.state)
            })
        } else { localStorage.setItem('postFeed',JSON.stringify([])) }
    }

    renderTopicFilters = () => {
        const { topics, topicFilter } = this.state
        const { classes } = this.props
        const topicList = [...topics]
        const dropDownList = [...topics]
        return <React.Fragment>
            {topicList.splice(0,4).map((topic, i) => {
                return <label key={topic}
                        className={classNames(classes.topicTags, topicFilter === topic ? classes.isSelectedTopic : '' )}
                        onClick={()=> this.handleFeedFilter(topic)}>{topic}</label>
            })}
            {dropDownList.length > 4 && <Select
                native
                className={classNames(classes.topicTags, classes.topicDropdown)}
                onChange={e => this.handleFeedFilter(e.target.value)}
            >
            <option value="">More</option>
            {dropDownList.splice(4,[topicList.length]).map((topic, index) => <option key={index} value={topic}>{topic}</option>)}
            </Select>}
        </React.Fragment>
    }

    renderPosts = () =>{
        const { classes } = this.props
        const { postFeed, topicFilter, filteredFeed, optionsDropdownOpen } = this.state
        const filnalFeedList = topicFilter === 'All Posts' ? postFeed : filteredFeed
        return <div className="postFeed">
            {filnalFeedList && filnalFeedList.sort().reverse().map((post, i) => {
            return  (<div key={i} className={classNames('row', 'paperDiv', classes.post)}>
                    {post['topicTags'].map(topic => <span key={topic} className={classNames(classes.postTags,"label" ,"grayText")}>{topic}</span>)}
                    <div className="row" style={{display:'flex'}}>
                        <div className={"col-9"}>
                            <AvatarIcon className={classes.avatarIcon}/> 
                            <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                                <span className={classNames("label", classes.userName)}>Tejas</span>
                                <span className={classNames("label", "greenText")} style={{textTransform:"uppercase"}}>Patient's friend</span>
                            </div>
                        </div> 
                        <div className={"col-1"}>
                            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true"
                                onClick={()=> this.handleOptionOpen(post.id)}
                            ><MoreVertIcon/>
                            </IconButton>
                        </div>
                        {optionsDropdownOpen.id === post.id && optionsDropdownOpen.open &&
                         <div id="postOptionDropdown" className={classes.postOptionDropdown}>
                            {['Delete post','Close'].map((option) => (
                                <span key={option} className={classNames(classes.postOptions, "label")}
                                    onClick={()=> this.handlePostOptions(option, post.id)}
                                >{option}</span>
                            ))}
                        </div>}
                    </div>
                    <div className="row">{post.caption}</div>
                        {post.media !== 'unset' && <div className="row">
                        {/* <canvas id={`feedImg${post.id}`} className={classes.feedImage}></canvas> */}
                        <img src={post.media} className={classes.feedImage} alt="Post media"/>
                        {/* { document.getElementById(`feedImg${post.id}`) && this.renderFeedImage(post.media, `feedImg${post.id}`)} */}
                    </div>}
                </div>)
            })}
            {filnalFeedList.length === 0 && <h4>No existing posts. Start posting!</h4>}
        </div>
    }

    //Rendering on canvas using base64 String
    // renderFeedImage = (baseUrl, id) => {
    //     console.log(id)
    //     const canvas =  document.getElementById(`${id}`) 
    //     const context = canvas.getContext('2d')
    //     const img = new Image()
    //     img.onload = function() {
    //         context.drawImage(this, 0, 0, (img.width*4), (img.height*4));
    //     }
    //     img.src = baseUrl
    // }

    handleFeedFilter = (topic) => {
        const { postFeed } = this.state
        let filteredFeedList = []
        this.setState({ topicFilter: topic},
        () => {
            if(this.state.topicFilter !== "All Posts"){
                postFeed.map(async (post) => {
                    if(post['topicTags'].includes(this.state.topicFilter)){
                        await filteredFeedList.push(post)
                        this.setState({filteredFeed: filteredFeedList})
                    } else { this.setState({filteredFeed: []}) }
                    return ''
                })
            }
        })
    }

    handleFeed = () => {        //Handle and render new posts]
        const { postFeed, topicFilter } = this.state
        const { postInfo } = this.props
        if((postFeed.length !== postInfo.postFeed.length)&& postInfo.postSuccessful){
            let newFilteredFeed = postInfo.postFeed.filter(post => post.topicTags.includes(topicFilter))
            this.setState({postFeed: postInfo.postFeed, filteredFeed: newFilteredFeed}
                // ,()=> window.location.reload()
            )
        }
    }

    handleOptionOpen = (id) =>{
        let temp = {
            id,
            open: true
        }
        this.setState({optionsDropdownOpen: temp})
    }

    handlePostOptions = (option, id) => {
        const { postFeed, filteredFeed } = this.state
        if(option === 'Delete post'){
            const newPostFeed = postFeed.filter(post => post.id !== id)
            const newFilteredFeed = filteredFeed.filter(post => post.id !== id)
            console.log(newPostFeed)
            console.log(newFilteredFeed)
            this.setState({ 
                postFeed: newPostFeed,
                filteredFeed: newFilteredFeed
            },
                ()=> {
                    this.props.postAction(this.state)
                    if(this.state.postFeed.length === 0){
                        localStorage.setItem('postFeed', JSON.stringify([]))
                    } else { localStorage.setItem('postFeed', JSON.stringify(this.state.postFeed)) }
                })
        } else {
            this.setState({optionsDropdownOpen: false})
        }
    }

    render() {
        const { postFeed, topicFilter, filteredFeed,widgetAction } = this.state
        const filnalFeedList = topicFilter === 'All Posts' ? postFeed : filteredFeed
        const { classes } = this.props
        return (
            <div className="homeContainer">
                <div className="sideBar">
                    <Sidebar />
                </div>
                <div className="postSection">
                    <div className="row">
                        <PostWidget actions={widgetAction} handleFeed={this.handleFeed}/>
                    </div>
                    <div className={classes.filterTags}>
                        {this.renderTopicFilters()}
                    </div>
                    {filnalFeedList && this.renderPosts()}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Home))