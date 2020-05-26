import React, { useState, useCallback } from 'react'

export const AuthContext = React.createContext({
   isAuth: false,
   setIsAuth: () => { },
   userDetails: {
      username: '',
      email: ''
   },
   setUserDetails: () => { },
   logout: () => { },
   login: () => { }
})

export default props => {
   const [isAuth, setIsAuth] = useState(false)
   const [userDetails, setUserDetails] = useState({
      username: '',
      email: ''
   })

   const logout = useCallback(() => {
      setUserDetails({})
      setIsAuth(false)
      localStorage.removeItem('token')
   }, [])

   const login = useCallback((user, token) => {
      setIsAuth(true)
      setUserDetails(user)
      token && localStorage.setItem('token', token)
   }, [])

   return <AuthContext.Provider value={{ login, logout, isAuth, setIsAuth, userDetails, setUserDetails }}>
      {props.children}
   </AuthContext.Provider>
}