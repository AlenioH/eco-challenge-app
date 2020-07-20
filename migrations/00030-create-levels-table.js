exports.up = async (sql) => {
  await sql`
	CREATE TABLE user_levels(user_id INT, 
	challenges_completed INT DEFAULT 0, 
	level VARCHAR DEFAULT 'Young padawan')
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE user_levels
	`;
};
