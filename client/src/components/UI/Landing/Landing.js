import React from 'react'
import { useQuery } from '@apollo/react-hooks'
// import getAllCategories from '../../../gql-queries/allCategories'
import getLandingData from '../../../gql-queries/getLandingData'
import CategoryHeader from './CategoryHeader'
import CategoryBody from './CategoryBody'

const Landing = () => {
   const { data } = useQuery(getLandingData)
   return (
      <div className="container">
         {data && data.landingInfo &&
            <ol>
               {data.landingInfo.map(x =>
                  (
                     <li key={x.title} className="section">
                        <CategoryHeader text={x.title} />
                        {x.subcategories.length > 0 && <CategoryBody categories={x.subcategories} />}
                     </li>
                  )
               )}
            </ol>
         }
      </div>
   )
}

export default Landing