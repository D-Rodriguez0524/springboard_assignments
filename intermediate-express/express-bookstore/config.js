/** Common config for bookstore. */


let DB_URI = `postgresql:`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}//biztime_:sunrise69@localhost:5432/books-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}//biztime_:sunrise69@localhost:5432/books`;
}


module.exports = { DB_URI };