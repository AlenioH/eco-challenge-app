exports.up = async (sql) => {
  await sql`
	CREATE TABLE daily_tips(id SERIAL PRIMARY KEY, 
	title VARCHAR NOT NULL, 
	content TEXT, 
	img VARCHAR NOT NULL)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE daily_tips
	`;
};
