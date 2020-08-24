const initialState = {
  postFeed : [],
  postSuccessful: false
}
export default (state = initialState, action) => {
  console.log(action.payload)
    switch (action.type) {
      case 'SAVE_POST':
      return {
        postFeed: [...action.payload.postFeed],
        postSuccessful: action.payload.postSuccessful
      }
     default:
      return state
    }
}