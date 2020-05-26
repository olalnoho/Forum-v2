import { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import getCurrentUserQuery from '../gql-queries/getCurrentUser'
import { AuthContext } from '../contexts/AuthContext'
const useAuth = () => {
   const { logout, login } = useContext(AuthContext)
   const { data, error, loading } = useQuery(getCurrentUserQuery)

   useEffect(() => {
      if (data && data.getCurrentUser) {
         login(data.getCurrentUser)
      }
   }, [data, login])

   useEffect(() => {
      if (error) {
         logout()
      }
   }, [error, logout])

   // @note
   // We're exporing loading because other components
   // might want to know when the request is done - like the header for links

   return {
      loading
   }
}

export default useAuth