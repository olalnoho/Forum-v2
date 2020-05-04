DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS subcategory;

CREATE TABLE user (
   id INTEGER NOT NULL PRIMARY KEY,
   username VARCHAR(25) NOT NULL UNIQUE,
   password CHAR(60) NOT NULL
);

-- PW is 60 because bcrypt hashlen is 60

CREATE TABLE thread (
   id INTEGER NOT NULL PRIMARY KEY,
   subcategory_id INT NOT NULL,
   title VARCHAR(100) NOT NULL,
   content TEXT NOT NULL,
   started_by INT NOT NULL,

   CONSTRAINT subc_fk
      FOREIGN KEY(subcategory_id)
      REFERENCES subcategory(id)
      ON DELETE CASCADE,

   CONSTRAINT user_fk
      -- I don't want to delete thread
      -- with user, probably.
      FOREIGN KEY(started_by)
      REFERENCES user(id)
);

CREATE TABLE post (
   id INTEGER NOT NULL PRIMARY KEY,
   content TEXT NOT NULL,
   user_id INTEGER NOT NULL,
   FOREIGN KEY(user_id) REFERENCES user(id)
);

CREATE TABLE category (
   id INTEGER NOT NULL PRIMARY KEY,
   title VARCHAR(100) NOT NULL
);

CREATE TABLE subcategory (
   id INTEGER NOT NULL PRIMARY KEY,
   title VARCHAR(50) NOT NULL,
   category_id INT NOT NULL,
   description VARCHAR(200) NOT NULL,
   
   CONSTRAINT c_fk
      FOREIGN KEY(category_id)
      REFERENCES category(id)
      ON DELETE CASCADE
);