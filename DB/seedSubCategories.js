const faker = require('faker')
const conn = require('./connection')

const insert = async (scs) => {
   await conn('subcategory').insert(scs)
}

const generate = async (l = 4) => {
   const scs = Array.from({ length: l }).map(_ => ({
      title: faker.lorem.words(),
      category_id: Math.ceil(Math.random() * l),
      description: faker.lorem.sentences()
   }))

   await insert(scs)
}

module.exports = generate