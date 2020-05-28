const { resolver: user } = require('./user')
const { resolver: category } = require('./category')
const { resolver: subcategory } = require('./subcategory')
const { resolver: thread } = require('./thread')
const { resolver: post } = require('./post')
const { resolver: optimizations } = require('./optimizations')


module.exports = {
   ...user,
   ...category,
   ...subcategory,
   ...thread,
   ...post,
   ...optimizations,
}