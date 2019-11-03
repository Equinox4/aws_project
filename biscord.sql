CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE user --

CREATE TABLE user (
    id_user serial,
    lastname varchar(64),
    firstname varchar(64),
    pseudo varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    password varchar NOT NULL,
    uuid_user uuid UNIQUE NOT NULL,
    couleur varchar(16),
    created_at date NOT NULL
);

ALTER TABLE user ALTER COLUMN uuid_user SET DEFAULT uuid_generate_v4();
ALTER TABLE user ALTER COLUMN created_at SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD"T"HH24:MI:SSOF');

ALTER TABLE user ADD CONSTRAINT pk_user PRIMARY KEY (id_user);

-- TABLE server --

CREATE TABLE server (
    id_server serial,
    server_name varchar(64) NOT NULL,
    server_ip inet NOT NULL,
    port smallint NOT NULL
);

ALTER TABLE server ADD CONSTRAINT pk_server PRIMARY KEY (id_server);

-- TABLE user_server --

CREATE TABLE user_server (
    id_server integer,
    id_user integer
);

ALTER TABLE user_server ADD CONSTRAINT pk_user_server PRIMARY KEY (id_server, id_user);
ALTER TABLE user_server ADD CONSTRAINT fk_user_server_user FOREIGN KEY (id_user) REFERENCES user(id_user);
ALTER TABLE user_server ADD CONSTRAINT fk_user_server_server FOREIGN KEY (id_server) REFERENCES server(id_server);

-- TABLE channel --

CREATE TABLE channel (
    id_channel serial,
    channel_name varchar(64),
    id_server integer
);

ALTER TABLE channel ADD CONSTRAINT pk_channel PRIMARY KEY (id_channel);

-- TABLE user_channel --

CREATE TABLE user_channel (
    id_channel integer,
    id_user integer
);

ALTER TABLE user_channel ADD CONSTRAINT pk_user_channel PRIMARY KEY (id_channel, id_user);
ALTER TABLE user_channel ADD CONSTRAINT fk_user_channel_user FOREIGN KEY (id_user) REFERENCES user(id_user);
ALTER TABLE user_channel ADD CONSTRAINT fk_user_channel_channel FOREIGN KEY (id_channel) REFERENCES channel(id_channel);
