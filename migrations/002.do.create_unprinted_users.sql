CREATE TABLE unprinted_users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL, 
    password TEXT NOT NULL,
    purchased INTEGER [],
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE unprinted_books
    ADD COLUMN
        created_by INTEGER REFERENCES unprinted_users(id)
        ON DELETE CASCADE;