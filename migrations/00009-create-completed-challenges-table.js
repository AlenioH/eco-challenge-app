exports.up = async (sql) => {
  await sql`
	CREATE TABLE completed_challenges(
    challenge_id INT, 
	user_id INT)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE completed_challenges
	`;
};
