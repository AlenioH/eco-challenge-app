exports.up = async (sql) => {
  await sql`
	INSERT INTO challenges(name, img, category, description) VALUES ('Plant a tree', '/tree.jpg', 'general', 'Planting a tree can be a really fun outdoor activity! You can cooperate with friends and neighbors and help improve the ecology of your neighborhood.'),
	('Avoid plastic packaging', '/fruits.jpg', 'trash', 'You can purchase reusable textile bags for fruits and vegetables. Also consider the fact that you can buy many fruits and vegetables without any packaging whatsoever, for example, bananas. Try buying only ''naked'' fruits and veggies for one week'),
  ('Switch off lights', '/light.jpg', 'power', '1/3 of our electricity bills is wasted on unnecessary lighting. For one week try switching off the light whenever leaving the room, even if it is for a couple of minutes.'),
  ('Car-free day', '/oeffis.jpg', 'transportation', 'On a day when you would normally use a car, try taking public transportation instead!'),
	('Clean-plate day', '/clean-plate.jpg', 'food', 'For one day think carefully of the amount of food you are preparing in order to avoid wasting avoid. In case you have leftovers, keep them and use them as a base for new creative recipies the next day!'),
  ('Be a respnosible consumer', '/consumer.jpg', 'general', 'Think carefully before purchasing something: do you really need it? Taming your consumption habits saves the resources and helps to produce less trash. Try to be a responsible consumer for two weeks!')

	`;
};

//remove tips from databse

exports.down = async (sql) => {
  await sql`
	DELETE FROM challenges WHERE name IN('Be a responsible consumer', 'Clean-plate day', 'Car-free day', 'Switch off lights', 'Avoid plastic packaging', 'Plant a tree') 
	`;
};
