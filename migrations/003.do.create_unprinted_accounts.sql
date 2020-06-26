CREATE TABLE unprinted_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES unprinted_users(id),
    account_id TEXT NOT NULL
);