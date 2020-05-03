module.exports = require('knex')({
   client: 'sqlite3',
   connection: {
      filename: "D:/Javascript/Full Projects/BetterForum/DB/forum.sqlite",
   },
   useNullAsDefault: true
});