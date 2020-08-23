import React, { Component } from 'react'
import './Styles/main.css'
import EditIcon from '@material-ui/icons/EditOutlined'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined'
// import DateRangeIcon from '@material-ui/icons/DateRange';
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined'
import { withStyles } from '@material-ui/core/styles'
// import { connect } from 'react-redux'
import LocationIcon from '@material-ui/icons/LocationOnOutlined'
import AddMediaIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import classNames from 'classnames'
import Modal from '@material-ui/core/Modal'
import PostModal from './PostModal'

// function mapStateToProps(state) {
//     return {

//     }
// }

const styles = theme =>({
    widgetContainer:{
        padding: '10px'
    },
    topBar: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'row'
    },
    postType:{
        display: 'inline-flex',
        borderRight: 'solid 2px #f3f1f1',
        padding: '5px 20px 5px 0',
        "&:last-child":{ borderRight:'none'}
    },
    widgetIcon:{
        fontSize: '20px',
        color: '#20af8e',
        padding: '0 10px',
        cursor: 'pointer',
        "&:hover":{
            backgroundColor: '#b4f9d3'
        }
    },
    widgetIconLabel:{
        fontSize: '12px',
        lineHeight: '20px',
        fontWeight: '500',
        color: '#20af8e',
    },
    widgetInputContainer:{
        display:'block',
        backgroundColor: '#f3f1f1'
    },
    widgetInput:{
        width: '80%',
        margin:'auto',
        padding: '10px',
        backgroundColor: '#f3f1f1',
        border: '0',
        outline: '0',
        fontWeight:'500'
    },
    inputIcons:{
        color: '#c5c0c0',
        verticalAlign: 'middle'
    },
    postPopup:{
        backgroundColor: '#fff',
        width: '50%',
        left:'25% !important',
        top: '15% !important',
        height: 'auto',
        outline: '0'
    },
    selected: { borderBottom: 'solid 1px #20af8e'},
    closeBtn: {
        textAlign: 'right',
        fontWeight: '600',
        cursor: 'pointer'
    },
    modalContainer:{
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        outline: '0'
    }
})

class PostWidget extends Component {
    state = {
        postModalOpen: false,
        postType: ''
    }
    componentDidMount(){

    }

    handleModalClose = () => {
        this.setState({ postModalOpen: false})
    }

    handleWidget = (data) =>{
        console.log(data)
    }

    renderPostTypeBar = (isPopup = false) =>{
        const { classes } = this.props
        const { postType } = this.state
        return <div className={classes.topBar}>
            <div className={classNames(classes.postType, isPopup && postType === 'Post' ? classes.selected: '')}>
                <EditIcon className={classes.widgetIcon} 
                    onClick={()=> this.setState({postModalOpen: true, postType: 'Post'})}
                />
                <label className={classes.widgetIconLabel}>Post</label>
            </div>
            <div className={classNames(classes.postType, isPopup && postType === 'Question'? classes.selected: '')}>
                <HelpIcon className={classes.widgetIcon} 
                    onClick={()=> this.setState({postModalOpen: true, postType:'Question'})}
                />
                <label className={classes.widgetIconLabel}>Ask Question</label>
            </div>
            <div className={classNames(classes.postType, isPopup && postType === 'Poll'? classes.selected: '')}>
                <PollOutlinedIcon className={classes.widgetIcon} 
                    onClick={()=> this.setState({postModalOpen: true, postType:'Poll'})}
                />
                <label className={classes.widgetIconLabel}>Poll</label>
            </div>
            <div className={classNames(classes.postType, isPopup && postType === 'Event'? classes.selected: '')}>
                <DateRangeIcon className={classes.widgetIcon} 
                    onClick={()=> this.setState({postModalOpen: true, postType:'Event'})}
                />
                <label className={classes.widgetIconLabel}>Event</label>
            </div>
        </div>
    }

    render() {
        const { classes } = this.props
        const { postModalOpen } = this.state
        return (
            <React.Fragment>
                <div className={classNames(classes.widgetContainer, 'paperDiv')}>
                    {this.renderPostTypeBar()}
                    <div className={classes.widgetInputContainer}>
                        <input 
                            type="text" 
                            placeholder="Whats on your mind?" 
                            className={classes.widgetInput}
                            onClick={()=> this.setState({postModalOpen: true, postType: 'Post'})}
                            disabled={postModalOpen}
                        />
                        <LocationIcon className={classes.inputIcons} />
                        <AddMediaIcon  className={classes.inputIcons}/>
                    </div>
                </div>
                <Modal
                    open={postModalOpen}
                    onClose={this.handleModalClose}
                    className={classes.postPopup}
                >
                    <div className={classNames(classes.modalContainer, "paperDiv")}>
                        <span className={classes.closeBtn}
                            onClick={()=> this.handleModalClose()}
                        >x</span>
                        <hr />
                        {this.renderPostTypeBar(true)}
                        <PostModal postInfo={this.state} handlePostWidget={this.handleWidget}/>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(PostWidget)