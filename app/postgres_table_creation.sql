-- After creating a database, connect to it and run the following --
-- Don't forget to add YOUR password in the database_config.yaml file -- 

CREATE TABLE users(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    password_hash VARCHAR(128) NOT NULL
);

CREATE TABLE events(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    description VARCHAR(10000) NOT NULL,
    image_filepath VARCHAR(255) NOT NULL,
    date DATE,
    location VARCHAR(80)
);

ALTER TABLE events
ADD COLUMN user_id INT;

ALTER TABLE events
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;

CREATE TABLE feedback(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(320),
    feedback VARCHAR(1500) NOT NULL,
);
