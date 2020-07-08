exports.up = async (sql) => {
  await sql`
	ALTER TABLE challenges 
ADD COLUMN days INT;
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE challenges
	`;
};
