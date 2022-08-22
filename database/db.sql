CREATE DATABASE db_links;

USE db_links;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);



-- users  new
CREATE TABLE users1 (
  id INT(11) NOT NULL  PRIMARY KEY ,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  rol VARCHAR    (4) NOT NULL,
  user_id INT(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

--ALTER TABLE users1  ADD PRIMARY KEY (id);

ALTER TABLE users1   MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users1 (id, username, password, fullname,rol) 
  VALUES (1, 'john', 'password1', 'John Carter','adm');

SELECT * FROM users1;



-- tesis TABLE
CREATE TABLE tesis (
  id INT(11) NOT NULL ,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(150) NOT NULL,
  asesor VARCHAR(150) NOT NULL,
  archivo VARCHAR(150)NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user1 FOREIGN KEY(user_id) REFERENCES users1(id)
);

ALTER TABLE tesis  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE links   ADD PRIMARY KEY (id);




ALTER TABLE tesis   ADD PRIMARY KEY (id);

ALTER TABLE tesis  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE tesis;
