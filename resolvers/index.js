const { resolver: user } = require('./user')
const { resolver: category } = require('./category')
const { resolver: subcategory } = require('./subcategory')

module.exports = {
   ...user,
   ...category,
   ...subcategory
}