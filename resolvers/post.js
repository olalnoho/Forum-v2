module.exports = {}

class Post {
   constructor({ id, content }) {
      Object.assign(this, { id, content })
   }
}