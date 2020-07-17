exports.up = async (sql) => {
  await sql`
	ALTER TABLE user_challenges 
ADD COLUMN email_sent BOOLEAN;
	`;
};

exports.down = async (sql) => {
  await sql`
  ALTER TABLE user_challenges
	DROP COLUMN email_sent
	`;
};
