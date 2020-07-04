exports.up = async (sql) => {
  await sql`
	ALTER TABLE challenges
DROP COLUMN length;
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE challenges
	`;
};
