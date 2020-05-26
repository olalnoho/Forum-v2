const { resolver: user } = require('./user')
const { resolver: category } = require('./category')
const { resolver: subcategory } = require('./subcategory')
const { resolver: thread } = require('./thread')

module.exports = {
   ...user,
   ...category,
   ...subcategory,
   ...thread
}