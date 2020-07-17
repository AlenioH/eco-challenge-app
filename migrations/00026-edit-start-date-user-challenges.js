exports.up = async (sql) => {
  await sql`
	ALTER TABLE user_challenges 
  DROP COLUMN start_date;
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE user_challenges

	`;
};
