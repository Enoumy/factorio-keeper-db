CREATE TABLE IF NOT EXISTS Users
(
  username VARCHAR(64) NOT NULL,
  pin VARCHAR(16) NOT NULL,
  created_date DATE NOT NULL,
  PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS  Blueprints
(
  b_id INT NOT NULL,
  blueprint_string VARCHAR(32768) NOT NULL,
  title VARCHAR(128) NOT NULL,
  created_by VARCHAR(64) NOT NULL,
  created_date DATE NOT NULL,
  description VARCHAR(512) NOT NULL,
  PRIMARY KEY (b_id),
  FOREIGN KEY (created_by) REFERENCES Users(username)

);

CREATE TABLE IF NOT EXISTS  BlueprintImages
(
  image_id INT NOT NULL,
  content_type VARCHAR(32) NOT NULL,
  image_blob BLOB NOT NULL,
  b_id INT NOT NULL,
  PRIMARY KEY (image_id),
  FOREIGN KEY (b_id) REFERENCES Blueprints(b_id)
);

CREATE TABLE IF NOT EXISTS  owns
(
  b_id INT NOT NULL,
  username VARCHAR(64) NOT NULL,
  PRIMARY KEY (b_id, username),
  FOREIGN KEY (b_id) REFERENCES Blueprints(b_id),
  FOREIGN KEY (username) REFERENCES Users(username)
);
