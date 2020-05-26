import { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import getCurrentUserQuery from '../gql-queries/getCurrentUser'
import { AuthContext } from '../contexts/AuthContext'
const useAuth = () => {
   const { setIsAuth, setUserDetails } = useContext(AuthContext)
   const { data, error } = useQuery(getCurrentUserQuery)
   useEffect(() => {
      if (data && data.getCurrentUser) {
         setIsAuth(true)
         setUserDetails(data.getCurrentUser)
      }
   }, [data, setIsAuth, setUserDetails])

   useEffect(() => {
      if (error) {
         setIsAuth(false)
         setUserDetails({})
         localStorage.removeItem('token')
      }
   }, [error])
}

export default useAuth