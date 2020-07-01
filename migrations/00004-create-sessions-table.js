exports.up = async (sql) => {
  await sql`
	CREATE TABLE sessions(
    id SERIAL PRIMARY KEY, 
	user_id VARCHAR NOT NULL, 
	user_name VARCHAR NOT NULL,
	token VARCHAR NOT NULL)
	`;
};
//token = session ID

exports.down = async (sql) => {
  await sql`
	DROP TABLE sessions
	`;
};
