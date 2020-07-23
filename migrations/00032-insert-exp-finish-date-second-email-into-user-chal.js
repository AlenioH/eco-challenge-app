exports.up = async (sql) => {
  await sql`
	ALTER TABLE user_challenges 
ADD COLUMN expected_finish TIMESTAMP,
ADD COLUMN second_email_sent BOOLEAN DEFAULT false
	`;
};

exports.down = async (sql) => {
  await sql`
  ALTER TABLE user_challenges
	DROP COLUMN expected_finish
  DROP COLUMN second_email_sent
	`;
};
