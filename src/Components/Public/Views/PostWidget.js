import React, { Component } from 'react'
import './Styles/main.css'
import EditIcon from '@material-ui/icons/EditOutlined'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined'
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined'
import { withStyles } from '@material-ui/core/styles'
import LocationIcon from '@material-ui/icons/LocationOnOutlined'
import AddMediaIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import classNames from 'classnames'
import Modal from '@material-ui/core/Modal'
import PostModal from './PostModal'

const styles = theme =>({
    widgetContainer:{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    topBar: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'row'
    },
    modalTopBar:{ padding: '10px 10px 0 10px !important'},
    postType:{
        display: 'inline-flex',
        borderRight: 'solid 2px #f3f1f1',
        padding: '5px 20px 5px 0',
        "&:last-child":{ borderRight:'none'},
        '@media (max-width: 480px)':{ 
            display: 'inline-block',
            padding: '5px',
            width: '50%',
            textAlign: 'center'
        }
    },
    widgetIcon:{
        fontSize: '20px',
        color: '#20af8e',
        padding: '0 10px',
        cursor: 'pointer',
        '@media (max-width: 480px)':{ 
            display: 'block',
            margin: 'auto !important'
        }
    },
    widgetModalIcon:{
        padding: '0',
        margin: '0 10px',
        backgroundColor: '#b4f9d3',
        borderRadius: '50%'
    },
    widgetIconLabel:{
        fontSize: '12px',
        lineHeight: '20px',
        fontWeight: '500',
        cursor: 'pointer',
        color: '#20af8e',
        '@media (max-width: 480px)':{ textAlign: 'center'}
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
        fontWeight:'500',
        '@media (max-width: 480px)':{ width: '70%'}
    },
    inputIcons:{
        color: '#c5c0c0',
        verticalAlign: 'middle'
    },
    postPopup:{
        width: '60%',
        left:'25% !important',
        top: '5% !important',
        height: 'auto',
        outline: '0',
        overflowY:'scroll',
        '@media (max-width: 670px)':{ 
            width: '100%',
            left: '0 !important'
        }
    },
    selected: { borderBottom: 'solid 1px #20af8e'},
    closeBtn: {
        textAlign: 'right',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '5px 0',
        fontSize: '20px'
    },
    modalContainer:{
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        outline: '0'
    },
    modalPostType:{
        '@media (max-width: 670px)':{ display:'inline-flex'},
        '@media (max-width: 480px)':{ display:'inline-block'}
    }
})

class PostWidget extends Component {
    state = {
        postModalOpen: false,
        postType: ''
    }

    handleModalClose = () => this.setState({ postModalOpen: false})

    handleWidget = (data) =>{
        const { postSuccessful } = data
        if(postSuccessful) {
            this.setState({postModalOpen: false})
            this.props.handleFeed()
        }
    }

    handleTypeSelect = (type) => this.setState({postModalOpen: true, postType: type})

    renderPostTypeBar = (isPopup = false) =>{
        const { classes } = this.props
        const { postType } = this.state
        return <div className={classNames(classes.topBar, isPopup ? classes.modalTopBar: '')}>
            <div className={classNames(classes.postType, isPopup ? classes.modalPostType : '', 
                isPopup && postType === 'Post' ? classes.selected: '')}
                onClick={()=> this.handleTypeSelect('Post')}
            >
                <EditIcon className={classNames(classes.widgetIcon,isPopup ? classes.widgetModalIcon: '')} 
                    // onClick={()=> this.handleTypeSelect({postModalOpen: true, postType: 'Post'})}
                />
                <label className={classes.widgetIconLabel} >Post</label>
            </div>
            <div className={classNames(classes.postType, isPopup ? classes.modalPostType : '', 
                isPopup && postType === 'Question'? classes.selected: '')}
                onClick={()=> this.handleTypeSelect('Question')}
            >
                <HelpIcon className={classNames(classes.widgetIcon,isPopup ? classes.widgetModalIcon: '')} />
                <label className={classes.widgetIconLabel}>Ask Question</label>
            </div>
            <div className={classNames(classes.postType, isPopup ? classes.modalPostType : '', 
                isPopup && postType === 'Poll'? classes.selected: '')}
                onClick={()=> this.handleTypeSelect('Poll')}
            >
                <PollOutlinedIcon className={classNames(classes.widgetIcon,isPopup ? classes.widgetModalIcon: '')} />
                <label className={classes.widgetIconLabel}>Poll</label>
            </div>
            <div className={classNames(classes.postType, isPopup ? classes.modalPostType : '', 
                isPopup && postType === 'Event'? classes.selected: '')}
                onClick={()=> this.handleTypeSelect('Event')}
            >
                <DateRangeIcon className={classNames(classes.widgetIcon,isPopup ? classes.widgetModalIcon: '')} />
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
                        <LocationIcon className={classes.inputIcons} 
                            onClick={()=> this.setState({postModalOpen: true, postType: 'Post'})}
                        />
                        <AddMediaIcon  className={classes.inputIcons}
                            onClick={()=> this.setState({postModalOpen: true, postType: 'Post'})}
                        />
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
                        >x</span><hr style={{margin: '1px 0px',}}/>
                        {<hr/>}
                        {this.renderPostTypeBar(true)}
                        <PostModal postInfo={this.state} handlePostWidget={this.handleWidget}/>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(PostWidget)