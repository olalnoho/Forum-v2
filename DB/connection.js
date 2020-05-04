const db = require('knex')({
   client: 'sqlite3',
   connection: {
      filename: "D:/Javascript/Full Projects/BetterForum/DB/forum.sqlite",
   },
   useNullAsDefault: true
});


// @note
// For debug

db.on('query', data => {
   // console.log(data)
})

module.exports = db