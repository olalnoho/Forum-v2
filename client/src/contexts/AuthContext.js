import React, { useState } from 'react'

export const AuthContext = React.createContext({
   isAuth: false,
   setIsAuth: () => { },
   userDetails: {
      username: '',
      email: ''
   },
   setUserDetails: () => { },
})

export default props => {
   const [isAuth, setIsAuth] = useState(false)
   const [userDetails, setUserDetails] = useState({
      username: '',
      email: ''
   })

   return <AuthContext.Provider value={{ isAuth, setIsAuth, userDetails, setUserDetails }}>
      {props.children}
   </AuthContext.Provider>
}