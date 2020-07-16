exports.up = async (sql) => {
  await sql`
	ALTER TABLE sessions 
ADD COLUMN expiry_timestamp TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours'
	`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE sessions
DROP COLUMN expiry_timestamp
	`;
};
