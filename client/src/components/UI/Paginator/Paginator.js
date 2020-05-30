import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const PageNavigator = ({ page, perPage, total, top, bottom }) => {
   const location = useLocation()
   const numPages = Math.ceil(total / perPage)
   // if (numPages <= 1) return <div className="paginator"> </div>
   if (!page) page = 1
   return (
      <div className="paginator">
         <Link className={"btn btn--prev btn--nav" + (page <= 1 ? ' disabled' : '')} to={{
            pathname: location.pathname,
            search: `?page=${Number(page) - 1}`
         }}>Prev</Link>
         {Array.from({ length: numPages }, (_, i) => i + 1).map((x, i) => {
            // eslint-disable-next-line
            return <Link className={(page == x) ? 'btn btn--nav active' : 'btn btn--nav'} key={i} to={{
               pathname: location.pathname,
               search: `?page=${x}`
            }}> {x} </Link>
         })}
         <Link className={"btn btn--next btn--nav" + (page >= numPages ? ' disabled' : '')} to={{
            pathname: location.pathname,
            search: `?page=${Number(page || 1) + 1}`
         }}> Next </Link>
      </div>
   )
}

const Paginator = ({
   page, 
   perPage, 
   total, 
   children,
   top = true,
   bottom = true,
}) => {
   return (
      <>
         {top && <PageNavigator page={page} perPage={perPage} total={total} />}
         {children}
         {bottom && <PageNavigator page={page} perPage={perPage} total={total} />}
      </>
   )
}

export default Paginator