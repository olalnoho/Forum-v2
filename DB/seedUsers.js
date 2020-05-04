const faker = require('faker')
const bc = require('bcryptjs')
const conn = require('./connection')

const insert = async users => {
   await conn('user').insert(users)
}

const generate = async (l = 10) => {
   const pw = await bc.hash('password', 10);
   const users = Array.from({ length: l }).map(x => ({
      password: pw,
      username: faker.internet.userName()
   }))
   await insert(users)
}

module.exports = generate