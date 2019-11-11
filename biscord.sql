-- CLEANUP --

DROP TABLE IF EXISTS biscord_user CASCADE;
DROP TABLE IF EXISTS server CASCADE;
DROP TABLE IF EXISTS channel CASCADE;
DROP TABLE IF EXISTS user_channel CASCADE;
DROP TABLE IF EXISTS user_server CASCADE;
DROP TABLE IF EXISTS message CASCADE;

-- UUID EXTENSION --

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE user --

CREATE TABLE biscord_user (
    id_user serial,
    lastname varchar(64),
    firstname varchar(64),
    pseudo varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    password varchar NOT NULL,
    uuid_user uuid UNIQUE NOT NULL,
    couleur varchar(16),
    created_at text NOT NULL
);

ALTER TABLE biscord_user ALTER COLUMN uuid_user SET DEFAULT uuid_generate_v4();
ALTER TABLE biscord_user ALTER COLUMN created_at SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD"T"HH24:MI:SSOF');

ALTER TABLE biscord_user ADD CONSTRAINT pk_biscord_user PRIMARY KEY (id_user);

-- TABLE server --

CREATE TABLE server (
    id_server serial,
    uuid_server uuid UNIQUE NOT NULL,
    server_name varchar(64) NOT NULL,
    server_ip inet NOT NULL,
    port smallint NOT NULL,
    created_at text NOT NULL
);

ALTER TABLE server ALTER COLUMN uuid_server SET DEFAULT uuid_generate_v4();
ALTER TABLE server ALTER COLUMN created_at SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD"T"HH24:MI:SSOF');
ALTER TABLE server ADD CONSTRAINT pk_server PRIMARY KEY (id_server);

-- TABLE user_server --

CREATE TABLE user_server (
    id_server integer NOT NULL,
    id_user integer NOT NULL
);

ALTER TABLE user_server ADD CONSTRAINT pk_user_server PRIMARY KEY (id_server, id_user);
ALTER TABLE user_server ADD CONSTRAINT fk_user_server_user FOREIGN KEY (id_user) REFERENCES biscord_user(id_user);
ALTER TABLE user_server ADD CONSTRAINT fk_user_server_server FOREIGN KEY (id_server) REFERENCES server(id_server);

-- TABLE channel --

CREATE TABLE channel (
    id_channel serial,
    uuid_channel uuid UNIQUE NOT NULL,
    channel_name varchar(64) NOT NULL,
    id_server integer NOT NULL
);

ALTER TABLE channel ALTER COLUMN uuid_channel SET DEFAULT uuid_generate_v4();
ALTER TABLE channel ADD CONSTRAINT pk_channel PRIMARY KEY (id_channel);

-- TABLE user_channel --

CREATE TABLE user_channel (
    id_channel integer NOT NULL,
    id_user integer NOT NULL
);

ALTER TABLE user_channel ADD CONSTRAINT pk_user_channel PRIMARY KEY (id_channel, id_user);
ALTER TABLE user_channel ADD CONSTRAINT fk_user_channel_user FOREIGN KEY (id_user) REFERENCES biscord_user(id_user);
ALTER TABLE user_channel ADD CONSTRAINT fk_user_channel_channel FOREIGN KEY (id_channel) REFERENCES channel(id_channel);

-- TABLE message --

CREATE TABLE message (
    id_message serial,
    uuid_message uuid NOT NULL,
    id_channel integer NOT NULL,
    sent_at text NOT NULL,
    id_user integer NOT NULL,
    content varchar(4096) NOT NULL,
    edited boolean NOT NULL
);

ALTER TABLE message ALTER COLUMN uuid_message SET DEFAULT uuid_generate_v4();
ALTER TABLE message ALTER COLUMN sent_at SET DEFAULT to_char(current_timestamp, 'YYYY-MM-DD"T"HH24:MI:SSOF');
ALTER TABLE message ALTER COLUMN edited SET DEFAULT false;
ALTER TABLE message ADD CONSTRAINT pk_message PRIMARY KEY (id_message);
ALTER TABLE message ADD CONSTRAINT fk_message_channel FOREIGN KEY (id_channel) REFERENCES channel(id_channel);
ALTER TABLE message ADD CONSTRAINT fk_message_user FOREIGN KEY (id_user) REFERENCES biscord_user(id_user);

-- GRANT --
REVOKE ALL PRIVILEGES ON SCHEMA public from public;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE biscord_user TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE server TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE channel TO "www-data";
GRANT SELECT, INSERT, DELETE ON TABLE user_channel TO "www-data";
GRANT SELECT, INSERT, DELETE ON TABLE user_server TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE message TO "www-data";
