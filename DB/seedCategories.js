const faker = require('faker')
const conn = require('./connection')

const insert = async (c) => {
   await conn('category').insert(c)
}

const generate = async (l = 5) => {
   const c = Array.from({ length: 5 }).map(_ => ({
      title: faker.lorem.words()
   }))
   await insert(c)
}

module.exports = generate