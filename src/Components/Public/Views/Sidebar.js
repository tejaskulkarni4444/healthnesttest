import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

var Sidebar = (props) => {
    return(
        <div>
            {
                props.users.map((user, i)=>{
                    return(
                        <div>
                            Sidebar
                        </div>
                    );                
                })
            }
        </div>
    )
}

export default Sidebar