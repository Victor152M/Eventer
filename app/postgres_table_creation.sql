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
