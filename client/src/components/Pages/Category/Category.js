import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Thread from './Thread'
import Paginator from './Paginator'
import getSubcatgoryAndThreads from '../../../gql-queries/getSubcatgoryAndThreads'

const Category = ({
   match: { params: { id } },
   location: { pathname: currentUrl }
}) => {
   const { isAuth } = useContext(AuthContext)
   const { data } = useQuery(getSubcatgoryAndThreads, { variables: { id } })
   return (
      <div className="container">
         {data && <div className="subsection">
            <div className="subsection__back">
               <Link className="btn btn--light" to={'/'}>Go Back</Link>
            </div>
            <div className="subsection__header">
               <h2>{data.getSubcategoryById.title}</h2>
               <p>{data.getSubcategoryById.description}</p>
            </div>
            <div className="subsection__new">
               <Link className="btn btn--primary" to={isAuth ? `${currentUrl}/create` : '/register'}>Start a new Topic</Link>
            </div>
            <Paginator />
            <div className="subsection__threads">
               {data.getSubcategoryById.threads ?
                  <ol>
                     {data.getSubcategoryById.threads.map((x, i) => <Thread key={i} thread={x} />)}
                  </ol> :
                  <h3 className="heading-3">No threads have been created here yet.</h3>
               }
            </div>
            <Paginator />
         </div>}
      </div>
   )
}

export default Category
