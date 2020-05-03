const faker = require('faker')
const bc = require('bcryptjs')
const conn = require('./connection')

const insert = async () => {
   const pw = await bc.hash('password', 10);
   await conn('user').insert({
      password: pw,
      username: faker.internet.userName(),
      email: faker.internet.email()
   })
}

const generate = async () => {
   for(let i = 0; i < 10; i++){
      await insert()
   }
   conn.destroy()
      .then(_ => console.log('Connection closed'))
}

generate()