import React from 'react'

const Spinner = props => {
   let classes = 'Loader'
   if(props.className) {
      classes += ` ${props.className}`
   }
   return <div className={classes}> Loading...</div>
}

export default Spinner
