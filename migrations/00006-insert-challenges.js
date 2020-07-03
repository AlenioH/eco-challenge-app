exports.up = async (sql) => {
  await sql`
	INSERT INTO challenges(name, img, category, length, description) VALUES ('Reusable water bottle for one week', '/challenge-bottle.jpg', 'trash', 7, 'Look at the huge variety of those bottles: there is bamboo, glass, stainless steel...Just pick yours and avoid all that plastic trash!'),
	('Earth hour', '/earth-hour.jpg', 'power', 1, 'We all know the famous flashmob when the entire planet turns off the power for one hour. Good news is you can do it on any other day!'),
	('Veggie day', '/veggie-day.jpg', 'food', 1, 'Switching to a veggie diet does not only improve your health, but also helps to save the environment. Try going vegetarian or vegan for a day!'),
  ('Take a walk!', '/walk.jpg', 'transportation', 7, 'Every day for a week take a walk outside. It will improve your mood and health while also saving the carbon dioxide emissions produced by transportation.'),
  ('Air dry your hands!', '/air-dry.png', 'general', 7, 'For one week, Whenever you use a public bathroom, try drying your hands with the air-dryer instead of using paper towels. You will save forest!')

	`;
};

//remove tips from databse

exports.down = async (sql) => {
  await sql`
	DELETE FROM challenges WHERE name IN('Reusable water bottle for one week', 'Earth hour', 'Veggie day', 'Take a walk!', 'Air dry your hands!') 
	`;
};
