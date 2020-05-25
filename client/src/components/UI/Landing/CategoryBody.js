import React from 'react'

const CategoryBody = ({ categories }) => {
   return (
      <ul className="section__body">
         {categories.map((x, i) => (
            <li key={i} className="section__body__item">
               <div className="section__body__name">
                  {/* 
                     // @note Change this route 
                  */}
                  <a href="/category">{x}</a>
                  <p>This is a description of the category, feel free to browse it dude
                  This is a description of the category, feel free to browse it dude
                  This is a description of the category, feel free to browse it dude
                  This is a description of the category, feel free to browse it dude
                  </p>
               </div>
               <div className="section__body__posts hidesmall">
                  <span>{new Intl.NumberFormat().format(123)}</span>
                  <p>Posts</p>
               </div>
               <div className="section__body__poster">
                  <div>
                     <span >Last post: </span>
                     <p>{
                        i % 2 === 0 ? 'JohnSmoe' : 'DragonSlayer120981271'
                     }</p>
                     <p>26 December 2016</p>
                  </div>
               </div>
            </li>
         ))}
      </ul>
   )
}

export default CategoryBody
