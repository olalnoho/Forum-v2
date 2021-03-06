import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../../utils/formatDate'
const CategoryBody = ({ categories }) => {
   if (!categories) return <> </>
   return (
      <ul className="section__body">
         {categories.length > 0 && categories.map((x, i) => (
            <li key={i} className="section__body__item">
               <div className="section__body__name">
                  {/* 
                     // @todo Change this route 
                  */}
                  <Link to={`/category/${x.id}`}>{x.title}</Link>
                  <p> {x.description} </p>
               </div>
               <div className="section__body__posts hidesmall">
                  <span>{new Intl.NumberFormat().format(x.postcount)}</span>
                  <p> {x.postcount !== 1 ? 'Posts' : 'Post'} </p>
               </div>
               <div className="section__body__poster">
                  <div>
                     <span >Last post: </span>
                     {x.poster && <p>{x.poster}</p>}
                     <p>{x.latestpost ? formatDate(new Date(x.latestpost)) : 'No posts yet'}</p>
                  </div>
               </div>
            </li>
         ))}
      </ul>
   )
}

export default CategoryBody
