import React, { useContext  } from 'react'
import { useQuery } from '@apollo/react-hooks'
import queryString from 'query-string'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Thread from './Thread'
import Paginator from './Paginator'
import getSubcatgoryAndThreads from '../../../gql-queries/getSubcatgoryAndThreads'
import getThreads from '../../../gql-queries/getAllThreadsInSubcategory'
import getTotalThreads from '../../../gql-queries/getTotalThreadsInSubcategory'

const THREADS_PER_PAGE = 2

const Category = ({
   match: { params: { id } },
   location: { pathname: currentUrl, search },
}) => {
   const page = queryString.parse(search).page
   const { isAuth } = useContext(AuthContext)
   const { data, error: queryError } = useQuery(getSubcatgoryAndThreads, { variables: { id } })
   const { data: totalThreads, loading: totalThreadsLoading } = useQuery(getTotalThreads, { variables: { id } })
   const { data: threads } = useQuery(getThreads, {
      variables: {
         id,
         limit: THREADS_PER_PAGE,
         offset: (THREADS_PER_PAGE) * (page - 1)
      }
   })
   return (
      <div className="container">
         {queryError && <h2 className="heading-2"> Could not find category. </h2>}
         {data && <div className="subsection">
            <div className="subsection__back">
               <Link className="btn btn--light btn--back" to={'/'}>
                  <i className="fas fa-arrow-left"></i>
                  Go Back
               </Link>
            </div>
            <div className="subsection__header">
               <h2>{data.getSubcategoryById.title}</h2>
               <p>{data.getSubcategoryById.description}</p>
            </div>
            <div className="subsection__new">
               <Link className="btn btn--primary" to={isAuth ? `${currentUrl}/create` : '/register'}>Start a new Topic</Link>
            </div>
            {!totalThreadsLoading && <Paginator
               totalThreads={totalThreads.getTotalThreadsInSubcategory}
               page={page}
               theadsPerPage={THREADS_PER_PAGE}
            />}
            <div className="subsection__threads">
               {threads && threads.getAllThreadsInSubcategory.length > 0 ?
                  <ol>
                     {threads.getAllThreadsInSubcategory.map((x, i) => <Thread key={i} thread={x} />)}
                  </ol> :
                  (!page || page < 2) && <h3 className="heading-3">No threads have been created here yet.</h3>
               }
            </div>
            {totalThreads && <Paginator
               totalThreads={totalThreads.getTotalThreadsInSubcategory}
               page={page}
               theadsPerPage={THREADS_PER_PAGE}
            />}
         </div>}
      </div>
   )
}

export default Category
