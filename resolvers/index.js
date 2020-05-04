const user = require('./user')
const category = require('./category')
const subcategory = require('./subcategory')
module.exports = {
   ...user,
   ...category,
   ...subcategory
}