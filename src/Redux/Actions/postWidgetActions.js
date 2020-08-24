export const postAction = (data) => dispatch => {
    dispatch({
      type: 'SAVE_POST',
      payload: data
    })
   }