const faker = require('faker')
const conn = require('./connection')

/*
   id INTEGER NOT NULL PRIMARY KEY,
   title VARCHAR(100) NOT NULL,
   description VARCHAR(200) NOT NULL

*/

const insert = async () => {
   await conn('category').insert({
      title: faker.lorem.words(),
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