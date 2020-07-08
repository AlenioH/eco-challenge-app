exports.up = async (sql) => {
  await sql`
	UPDATE challenges

SET days = 7 
WHERE name = 'Reusable water bottle for one week';

-- SET days = 1 
-- WHERE name = 'Earth hour';
  
-- SET days = 1 
-- WHERE name = 'Veggie day';
  
-- SET days = 7 
-- WHERE name = 'Take a walk!';

-- SET days = 7 
-- WHERE name = 'Air dry your hands!';

-- SET days = 1 
-- WHERE name = 'Plant a tree';

-- SET days = 7 
-- WHERE name = 'Avoid plastic packaging';
  
-- SET days = 7 
-- WHERE name = 'Switch off lights';
 
-- SET days = 1 
-- WHERE name = 'Car-free day';

-- SET days = 1, description = 'For one day think carefully of the amount of food you are preparing in order to avoid wasting food. In case you have leftovers, keep them and use them as a base for new creative recipies the next day!' 
-- WHERE name = 'Clean-plate day';
 
-- SET days = 14 
-- WHERE name = 'Be a respnosible consumer';

	`;
};

exports.down = async (sql) => {
  await sql`
		ALTER TABLE challenges
DROP COLUMN days;
	`;
};
