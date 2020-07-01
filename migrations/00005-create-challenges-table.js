exports.up = async (sql) => {
  await sql`
	CREATE TABLE challenges(
    id SERIAL PRIMARY KEY, 
	name VARCHAR NOT NULL, 
	img VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  length INTEGER,
  description TEXT)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE challenges
	`;
};
