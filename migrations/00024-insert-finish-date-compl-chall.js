exports.up = async (sql) => {
  await sql`
	ALTER TABLE completed_challenges 
ADD COLUMN finish_date VARCHAR;
	`;
};

exports.down = async (sql) => {
  await sql`
		ALTER TABLE completed_challenges
DROP COLUMN finish_date;
	`;
};
