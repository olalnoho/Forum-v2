import React from 'react'
import { useLocation, Link } from 'react-router-dom'
const Paginator = ({
   page
}) => {
   const location = useLocation()
   return (
      <div className="subsection__pagination">
         {page > 1 && <Link className="subsection__pagination__prev" to={{
            pathname: location.pathname,
            search: `?page=${Number(page) - 1}`
         }}>Prev</Link>}
         {['1', '2', '3', '4', '5'].map((x, i) => {
            return <Link className={(page === x) || (!page && x === '1')? 'active' : ''} key={i} to={{
               pathname: location.pathname,
               search: `?page=${x}`
            }}> {x} </Link>
         })}
         <Link className="subsection__pagination__next" to={{
            pathname: location.pathname,
            search: `?page=${Number(page || 1) + 1}`
         }}>Next</Link>
      </div>
   )
}

export default Paginator