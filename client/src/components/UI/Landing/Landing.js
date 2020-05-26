import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import getAllCategories from '../../../gql-queries/allCategories'
import CategoryHeader from './CategoryHeader'
import CategoryBody from './CategoryBody'

// const MOCK_DATA = [
//    { name: 'WEB DESIGN RESOURCE', topics: ['First category', 'Second category'] },
//    { name: 'WEB DEVELOPMENT', topics: ['First category', 'Second category'] },
//    { name: 'SEO, WEBSITE MARKETING AND BUSINESS', topics: ['First category', 'Second category'] },
//    { name: 'SOFTWARE & HARDWARE', topics: ['First category', 'Second category'] },
// ]

const Landing = () => {
   const { data } = useQuery(getAllCategories)
   console.log(data)
   return (
      <div className="container">
         {data && data.getAllCategories && <div className="wrapper">
            <ol>
               {data.getAllCategories.map(x =>
                  (
                     <li key={x.id} className="section">
                        <CategoryHeader text={x.title} />
                        <CategoryBody categories={x.subcategories} />
                     </li>
                  )
               )}
            </ol>
         </div>}
      </div>
   )
}

export default Landing