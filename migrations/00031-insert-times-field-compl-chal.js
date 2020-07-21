exports.up = async (sql) => {
  await sql`
	ALTER TABLE completed_challenges 
ADD COLUMN completed_times INT DEFAULT 0;
	`;
};

exports.down = async (sql) => {
  await sql`
  ALTER TABLE completed_challenges
	DROP COLUMN completed_times
	`;
};
