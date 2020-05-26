import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Thread from './Thread'
import Paginator from './Paginator'
import getSubcatgoryAndThreads from '../../../gql-queries/getSubcatgoryAndThreads'
const MOCK_DATA = {
   cat_name: 'Web Designer Forum Introductions',
   cat_tagline: 'New to the Web Design Forum? - Tell us a little about yourself here.',
   threads: [
      {
         title: 'New Freelance Web Designer',
         replies: 12,
         views: 200,
         author: 'DragonSlayer',
         last_post: {
            author: 'Rick james',
            date: new Date()
         }
      },
      {
         title: 'Creation a nice personalized web designs',
         replies: 1,
         views: 300,
         author: 'Mia',
         last_post: {
            author: 'Donnatello Johnson',
            date: new Date()
         }
      },
      {
         title: 'Website Designer/Developer from Shropshire looking to help people',
         replies: 30,
         views: 400,
         author: 'Donna',
         last_post: {
            author: 'StetoschopeWarriorDude!',
            date: new Date()
         }
      },
      {
         title: 'Is it worth to buy the website development packages from unknown agency?',
         replies: 0,
         views: 2,
         author: 'DragonSlayer',
         last_post: {
            author: 'Rick james',
            date: new Date()
         }
      },
   ]
}
const Category = props => {
   const { data } = useQuery(getSubcatgoryAndThreads, { variables: { id: props.match.params.id } })
   console.log(data)
   return (
      <div className="container">
         <div className="wrapper">
            {data && <div className="subsection">
               <div className="subsection__header">
                  <h2>{data.getSubcategoryById.title}</h2>
                  <p>{data.getSubcategoryById.description}</p>
               </div>
               <div className="subsection__new">
                  <a className="btn btn--primary" href="#!">Start a new Topic</a>
               </div>
               <Paginator />
               <div className="subsection__threads">
                  {data.getSubcategoryById.threads ? 
                     <ol>
                        {data.getSubcategoryById.threads.map((x, i) => <Thread key={i} x={x} />)}
                     </ol> :
                     <h2 className="heading-3">No threads have been created here yet.</h2>
                  }
               </div>
               <Paginator />
            </div>}
         </div>
      </div>
   )
}

export default Category
