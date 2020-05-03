import React from 'react'

const Paginator = () => {
   return (
      <div className="subsection__pagination">
         {[1,2,3,4,5].map((x, i) => {
            return <span className={i == 0 ? 'active' : ''}> {x} </span>
         })}
         <a className="subsection__pagination__next" href="#!">Next</a>
      </div>
   )
}

export default Paginator
