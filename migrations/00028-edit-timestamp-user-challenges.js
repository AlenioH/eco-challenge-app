exports.up = async (sql) => {
  await sql`
  ALTER TABLE user_challenges
ALTER COLUMN start_date TYPE TIMESTAMP;
	`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE user_challenges
DROP COLUMN start_date
	`;
};
