exports.up = async (sql) => {
  await sql`
	


UPDATE challenges
SET days = 7 
WHERE id = 7;
  
-- UPDATE challenges 
-- SET days = 7 
-- WHERE id = 8;
 
-- UPDATE challenges 
-- SET days = 1 
-- WHERE id = 9;

-- UPDATE challenges
-- SET days = 1, description = 'For one day think carefully of the amount of food you are preparing in order to avoid wasting food. In case you have leftovers, keep them and use them as a base for new creative recipies the next day!' 
-- WHERE id = 10;
 
-- UPDATE challenges 
-- SET days = 14, name = 'Be a responsible consumer'
-- WHERE id = 11;

	`;
};

exports.down = async (sql) => {
  await sql`
		ALTER TABLE challenges
DROP COLUMN days;
	`;
};
