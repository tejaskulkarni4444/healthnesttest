import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import './Styles/main.css'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import LocationIcon from '@material-ui/icons/LocationOnOutlined'
import AddMediaIcon from '@material-ui/icons/AddPhotoAlternateOutlined'
import {connect} from 'react-redux'
import {postAction} from '../../../Redux/Actions/postWidgetActions'
import classNames from 'classnames'

const mapDispatchToProps = dispatch => ({
    postAction: (value) => dispatch(postAction(value))
})
const mapStateToProps = (state) => {
    return { storePostFeed: state.postActReducer }
}
const styles = theme =>({
    row:{
        margin: '10px auto'
    },
    captionInput:{
        border:'0',
        width: '100%',
        backgroundColor: '#f3f1f1',
        outline: 'none',
        resize: 'vertical',
        height: '100px'
    },
    selectedTags:{
        display: 'inline-block',
        padding: '5px 10px',
        color: '#fff',
        backgroundColor: '#20af8e',
        borderRadius: '20px',
        margin: '10px'
    },
    removeBtn:{
        cursor: 'pointer',
        padding: '0 0 0 15px',
        fontSize: '14px',
        verticalAlign: 'top'
    },
    mediaRemoveBtn:{
        position: 'relative',
        left: '110px',
    },
    inputIcons:{
        cursor: 'pointer',
        color: '#c5c0c0'
    },
    postBtn:{
        display: 'block',
        marginLeft: 'auto',
        cursor: 'pointer'
    },
    previewImage: { maxWidth: '100px'}
})

class PostModal extends Component {
    state = {
        currentPostInfo:{
            id: 0,
            type:'',
            caption:'',
            media:'unset',
            topicTags:[],
            // location: ''
        },
        postFeed: [],
        topics: ['News', 'Diet', 'LifeStyle', 'Symptoms', 'Treatment', 'Misc'],
        mediaRow: false,
        isValidPost: false,
        postSuccessful: false
    }
    componentDidMount(){
       const { postInfo } = this.props
       const existingPosts = localStorage.getItem('postFeed') ? JSON.parse(localStorage.getItem('postFeed')) : []
       this.setState({ postSuccessful: false})
       if(existingPosts) this.setState({postFeed: existingPosts})
       if (postInfo.postType){
           this.setState(state => {
               state.currentPostInfo.type = postInfo.postType
               return state
           })
       }
    }

    componentDidUpdate(){
        const { isValidPost } = this.state
        const isValid = this.isValidPost()  //Check if inputs are valid
        if(isValid !== isValidPost) this.setState({isValidPost: isValid})
    }

    isValidPost = () => {
        const { currentPostInfo } = this.state
        const isValidMedia = (currentPostInfo['media'] === 'unset' ||
         currentPostInfo['media'].includes('base64') || 
          currentPostInfo['media'].includes('blob'))   //Check if media value is valid
        let isValidPost = Object.keys(currentPostInfo)
        .map(key => {
            if(isValidMedia && currentPostInfo[key].length !== 0 && currentPostInfo[key] !== ' ' 
                && currentPostInfo[key] !== undefined){
                return true
            } else { return false}
        })
        return !isValidPost.includes(false)
    }

    handleInput = (value) => {  //Set latest changes to state
        this.setState(state => {
            state.currentPostInfo.caption = value
            return state
        })
    }

    handleTopicSelect = (value) => {
        const { topicTags } = this.state.currentPostInfo      //Add topic to selected topics
        const tempTags = [...topicTags]
        if(value && !tempTags.includes(value)){
            tempTags.push(value)
            this.setState(state => {
                state.currentPostInfo.topicTags = tempTags
                return state
            })
        }
    }

    handleRemoveTag = (topic) => {  //Delete tags from the selected tags
        let tempTags = [...this.state.currentPostInfo.topicTags]
        if(topic && tempTags){
            this.setState(state => {
                state.currentPostInfo.topicTags = tempTags.filter(tag => tag !== topic )
                return state
            })   
        }
    }

    handleImageInput = (event) => {             //Store image as Object url in state
        const url = event.target.files[0]
        this.setState(state => {
            state.currentPostInfo.media = URL.createObjectURL(url)
            return state
        })
    }

    //Store image as base64 string
    // handleImageInput = (event) => {
        // const myCanvas = document.getElementById('mycanvas')
        // const canvasContext = myCanvas.getContext('2d')
        // let base64URL = ''
        // let img = new Image()
        // img.onload = () => {
        //     canvasContext.drawImage(img, 0, 0)      //Draw image on canvas
        //     base64URL = myCanvas.toDataURL('image/jpeg')    //Convert image to data url b64 version
        //     if(base64URL) this.setState(state => {
        //         state.currentPostInfo.media = base64URL
        //         return state
        //     })
        //     // console.log(myCanvas.toDataURL('image/jpeg'))
        // }
        // img.src = URL.createObjectURL(event.target.files[0])
    // }

    handleRemoveMedia = () => {     //Remove current media selection
        this.setState(state => {
            state.currentPostInfo.media = ''
            state.mediaRow = false
            return state
        })
    }

    handleSubmit = () => {
        const { isValidPost, currentPostInfo, postFeed } = this.state
        const tempFeed = [...postFeed]  //Copying state to temp
        const postId = postFeed.length === 0 ? currentPostInfo.id+1 : postFeed[postFeed.length-1]['id']+1   //Set unique incremental id
        const tempInfo = {
            'id': postId,
            type: currentPostInfo.type,
            caption: currentPostInfo.caption,
            media: currentPostInfo.media,
            topicTags: currentPostInfo.topicTags,
        }
        if(isValidPost) {
            tempFeed.push(tempInfo)
            this.setState({postFeed: tempFeed, postSuccessful: true},async ()=> {
                await localStorage.setItem('postFeed', JSON.stringify(this.state.postFeed))
                await this.props.postAction(this.state)
                await this.props.handlePostWidget(this.state)
            })
        }
    }

    render() {
        const { classes } = this.props
        const { currentPostInfo, topics, mediaRow, isValidPost } = this.state
        return (
            <div style={{backgroundColor: 'white'}}>
                <hr style={{margin: '0'}}/>
                <textarea 
                    className={classes.captionInput}
                    placeholder="What's on your mind?"
                    value={this.state.currentPostInfo.caption}
                    onChange={(e)=> this.handleInput(e.target.value)}
                />
                {mediaRow && <div className={classes.row}>
                    {currentPostInfo.media && <span className={classNames(classes.removeBtn, classes.mediaRemoveBtn)} onClick={()=> this.handleRemoveMedia()}>x</span>}
                    {/* <canvas width="100" height="100" id="mycanvas"></canvas> */}
                    <img src={this.state.currentPostInfo.media} className={classes.previewImage} alt="media preview"/>
                </div>}
                <div className={classes.row} style={{display:'flex', flexDirection:'row-reverse'}}>
                    <LocationIcon className={classes.inputIcons} />
                    <label htmlFor="imageFile">
                        <AddMediaIcon  className={classes.inputIcons} />
                    </label>
                    <input 
                        type="file" 
                        id="imageFile" 
                        name='imageFile' 
                        style={{display: 'none'}}
                        onChange={e => this.handleImageInput(e)} 
                        onClick = {()=> this.setState({mediaRow: true})}
                    />
                </div>
                <div className={classes.row}>
                <FormControl className={classes.formControl}>
                    <h4>Add topics that best describe your post</h4>
                    <Select
                        native
                        // value={state.age}
                        onChange={e => this.handleTopicSelect(e.target.value)}
                    >
                    <option value="">Topics</option>
                    {topics.map((topic, index) => <option key={index} value={topic}>{topic}</option>)}
                    </Select>
                </FormControl>
                </div>
                <div>
                    {currentPostInfo.topicTags.map((topic, index) => {
                        return <div key={index} className={classNames("label", classes.selectedTags)}>
                                    <span>{topic}</span>
                                    <span onClick={() => this.handleRemoveTag(topic)} className={classes.removeBtn}>x</span>
                                </div>
                    })}
                </div><hr/>
                <div className="row">
                    <button type="submit" disabled={!isValidPost} 
                        className={classNames("btn", classes.postBtn, !isValidPost ? 'disabledBtn' : '')}
                        onClick={() => this.handleSubmit()}
                    >POST</button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(PostModal))
