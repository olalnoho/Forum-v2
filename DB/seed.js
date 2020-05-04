const seedUsers = require('./seedUsers')
const seedCategories = require('./seedCategories')
const seedSubCategories = require('./seedSubCategories')
const conn = require('./connection')


seedUsers()
   .then(seedCategories)
   .then(seedSubCategories)
   .catch(console.log)
   .finally(_ => conn.destroy())