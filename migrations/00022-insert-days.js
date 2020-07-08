exports.up = async (sql) => {
  await sql`
	


 
UPDATE challenges 
SET days = 14, name = 'Be a responsible consumer'
WHERE id = 11;

	`;
};

exports.down = async (sql) => {
  await sql`
		ALTER TABLE challenges
DROP COLUMN days;
	`;
};
