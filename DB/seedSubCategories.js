const faker = require('faker')
const conn = require('./connection')

/*
   id INTEGER NOT NULL PRIMARY KEY,
   title VARCHAR(100) NOT NULL,
   description VARCHAR(200) NOT NULL

*/

const insert = async () => {
   const fk = Math.ceil(Math.random() * 4)
   await conn('subcategory').insert({
      title: faker.lorem.words(),
      category_id: fk,
      description: faker.lorem.sentences()
   })
}

const generate = async () => {
   for(let i = 0; i < 4; i++){
      await insert()
   }
   conn.destroy()
      .then(_ => console.log('Connection closed'))
}

generate()

// conn.destroy()
//    .then(x => {
//       console.log('Connection closed')
//    })