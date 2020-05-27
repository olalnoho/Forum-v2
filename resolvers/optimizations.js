exports.resolver = {
   async landingInfo(args, { db }) {
      // @note
      // Just using field resolvers for this required three or four trips to the DB.
      // This is better i think.
      const res = await db.raw(`
      with postinfo AS (
         SELECT
            COUNT(p.id) as postcount,
            MAX(p.id) as latestpost,
            MAX(p.created_at) as creationdate,
            sc.id as subcatid
         FROM subcategory sc
            LEFT JOIn thread t ON sc.id = t.subcategory_id
            LEFT JOIN post p ON p.thread_id = t.id
            LEFT JOIN user u ON p.user_id = u.id
            GROUP BY sc.id
      ),
      
      userAndPostInfo as (
         SELECT
            username,
            subcatid,
            postcount,
            creationdate
         FROM postinfo pi
            LEFT JOIN post p on pi.latestpost = p.id
            LEFT JOIN user u on u.id = p.user_id
      )
      
      SELECT
         c.title as cat_title,
         sc.title as subcat_title,
         i.postcount,
         username,
         creationdate,
         sc.description,
         sc.id as subcatid
      FROM category c
         LEFT JOIN subcategory sc ON sc.category_id = c.id
         LEFT JOIN userAndPostInfo i ON sc.id = i.subcatid;
      `)
      return formatResponse(res)
   }
}

const formatResponse = data => {
   const objData = data.reduce((a, c) => {
      if (a[c.cat_title]) {
         a[c.cat_title].push({
            id: c.subcatid,
            title: c.subcat_title,
            postcount: c.postcount,
            poster: c.username,
            latestpost: c.creationdate,
            description: c.description
         })
      } else {
         a[c.cat_title] = []
         if (c.subcat_title) {
            a[c.cat_title].push({
               id: c.subcatid,
               title: c.subcat_title,
               postcount: c.postcount,
               poster: c.username,
               latestpost: c.creationdate,
               description: c.description
            })
         }
      }
      return a
   }, {})

   return Object.keys(objData).map(x => ({title: x, subcategories: objData[x]}))
}