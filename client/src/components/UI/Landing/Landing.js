import React from 'react'
import CategoryHeader from './CategoryHeader'
import CategoryBody from './CategoryBody'

const MOCK_DATA = [
   { name: 'WEB DESIGN RESOURCE', topics: ['First category', 'Second category'] },
   { name: 'WEB DEVELOPMENT', topics: ['First category', 'Second category'] },
   { name: 'SEO, WEBSITE MARKETING AND BUSINESS', topics: ['First category', 'Second category'] },
   { name: 'SOFTWARE & HARDWARE', topics: ['First category', 'Second category'] },
]

const Landing = () => {
   return (
      <div className="container">
         <div className="wrapper">
            <ol>
               {MOCK_DATA.map(x =>
                  (
                     <li key={x.name} className="section">
                        <CategoryHeader text={x.name} />
                        <CategoryBody categories={x.topics} />
                     </li>
                  )
               )}
            </ol>
         </div>
      </div>
   )
}

export default Landing