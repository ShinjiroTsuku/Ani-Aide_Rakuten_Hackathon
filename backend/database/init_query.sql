CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    area_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS area (
    area_id INTEGER PRIMARY KEY,
    prefecture_name TEXT NOT NULL,
    municipality_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pet (
    user_id INTEGER NOT NULL,
    pet_type TEXT NOT NULL,
    amount TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS request (
    user_id INTEGER NOT NULL,
    item_id TEXT NOT NULL,
    amount TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS supply (
    user_id INTEGER NOT NULL,
    item_id TEXT NOT NULL,
    amount TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS point (
    user_id INTEGER NOT NULL,
    point INTEGER NOT NULL
);


/*仮データ
INSERT INTO user(name, email, password, area_id) values("Hanako", "hanako@example.com", "cde123", 2);
INSERT INTO area(area_id, prefecture_name, municipality_name) values(1, "東京都", "千代田区");
INSERT INTO pet(user_id, pet_type, amount) values(1, "犬", 3);
INSERT INTO request(user_id, item_id, amount) values(1, 1, 10);
INSERT INTO supply(user_id, item_id, amount) values(2, 1, 10);
INSERT INTO point(user_id, point) values(2, 10);
*/