/** Database setup for BizTime. */

const { Client } = require("pg");

let DB_URl;

DB_URl = "postgresql:///biztime_exercise:biztime123@1ocalhost:5432/biztime";

const db = new Client({
    connectionString: DB_URl
});

db.connect();


module.exports = db;