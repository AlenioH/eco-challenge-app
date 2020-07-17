exports.up = async (sql) => {
  await sql`
	ALTER TABLE user_challenges 
  ADD COLUMN start_date TIMESTAMP NOT NULL;
	`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE user_challenges
DROP COLUMN start_date
	`;
};
