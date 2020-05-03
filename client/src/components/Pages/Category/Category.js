import React from 'react'
import Thread from './Thread'
import Paginator from './Paginator'
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
const Category = () => {
   return (
      <div className="container">
         <div className="wrapper">
            <div className="subsection">
               <div className="subsection__header">
                  <h2>{MOCK_DATA.cat_name}</h2>
                  <p>{MOCK_DATA.cat_tagline}</p>
               </div>
               <div className="subsection__new">
                  <a className="btn btn--primary" href="#!">Start a new Topic</a>
               </div>
               <Paginator />
               <div className="subsection__threads">
                  <ol>
                     {MOCK_DATA.threads.map((x, i) => <Thread key={i} x={x} />)}
                  </ol>
               </div>
               <Paginator />
            </div>
         </div>
      </div>
   )
}

export default Category
