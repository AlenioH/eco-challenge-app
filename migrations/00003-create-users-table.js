exports.up = async (sql) => {
  await sql`
	CREATE TABLE users(
  id SERIAL PRIMARY KEY, 
	username VARCHAR NOT NULL, 
	email VARCHAR NOT NULL, 
	password_hash VARCHAR NOT NULL)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE users
	`;
};
