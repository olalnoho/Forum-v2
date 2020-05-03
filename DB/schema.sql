DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS subcategory;

CREATE TABLE user (
   id INTEGER NOT NULL PRIMARY KEY,
   username VARCHAR(25) NOT NULL,
   email VARCHAR(200),
   password CHAR(60) NOT NULL
);

-- PW is 60 because bcrypt hashlen is 60

CREATE TABLE thread (
   id INTEGER NOT NULL PRIMARY KEY,
   subcategory_id INT NOT NULL,
   FOREIGN KEY(subcategory_id) REFERENCES subcategory(id)
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
   FOREIGN KEY(category_id) REFERENCES category(id)
);