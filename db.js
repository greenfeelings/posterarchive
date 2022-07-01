const database = "images";
const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/${database}`);

console.log("should be the database:", db);

module.exports.getImages = () => {
    const q = `SELECT * FROM images
    ORDER BY images DESC`;
    return db.query(q);
};

//`INSERT INTO user_profiles (age, city, homepage, user_id) VALUES ($1, $2, $3, $4) RETURNING id`,
//   [age, city, homepage, userId]

module.exports.addImage = (url, title, user) => {
    const q = `INSERT INTO images (url, username, title) VALUES ($1, $2, $3) RETURNING
    *`;
    const param = [url, user, title];
    return db.query(q, param);
};

module.exports.getModal = (id) => {
    const q = `SELECT * FROM images WHERE id = $1`;
    const param = [id];
    return db.query(q, param);
};
