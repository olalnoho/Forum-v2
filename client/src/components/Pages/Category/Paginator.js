import React from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
const Paginator = ({
   onNext,
   page
}) => {
   return (
      <div className="subsection__pagination">
         {['1', '2', '3', '4', '5'].map((x, i) => {
            return <span onClick={e => onNext(x)} key={i} className={x === page ? 'active' : ''}> {x} </span>
         })}
         <a className="subsection__pagination__next" href="#!">Next</a>
      </div>
   )
}

export default Paginator