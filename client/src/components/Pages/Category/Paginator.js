import React from 'react'
import { useLocation, Link } from 'react-router-dom'
const Paginator = ({
   page,
   totalThreads,
   theadsPerPage
}) => {
   const location = useLocation()
   const numPages = Math.ceil(totalThreads / theadsPerPage)
   if(!page) page = 1
   return (
      <div className="subsection__pagination">
         {page > 1 && <Link className="subsection__pagination__prev" to={{
            pathname: location.pathname,
            search: `?page=${Number(page) - 1}`
         }}>Prev</Link>}
         {Array.from({ length: numPages }, (_, i) => i + 1).map((x, i) => {
            // eslint-disable-next-line
            return <Link className={(page == x) ? 'active' : ''} key={i} to={{
               pathname: location.pathname,
               search: `?page=${x}`
            }}> {x} </Link>
         })}
         {page < numPages && <Link className="subsection__pagination__next" to={{
            pathname: location.pathname,
            search: `?page=${Number(page || 1) + 1}`
         }}>Next</Link>}
      </div>
   )
}

export default Paginator