exports.up = async (sql) => {
  await sql`
	INSERT INTO daily_tips(title, content, img) VALUES ('Bring your own cup', 'So many stores offer discounts if you bring your own cup. It''s time to go zero-waste!','/owncup.png'),
	('Enjoy your ice-cream with a cone', 'You will save a lot of plastic trash!', '/cone.png'),
	('Carry a reusable water bottle', 'The quality of the tap water in many countries allows to never ever buy a plastic bottle of water again. Make use of it!', '/bottle.png'),
	('Carry a reusable shopping bag', 'It doesn''t take much room in your bag and can save you a lot of trouble when shopping!', '/reusablebag.png'),
  ('Unsubscribe from newsletters you never read', 'Did you know that one email has a footprint of 4g CO2?', '/email.png'),
  ('Bring your own lunch to work', 'Not only does it reduce plastic trash, but also saves your money - home-made meals are way cheaper!', '/lunch.png')

	`;
};

//remove tips from databse

exports.down = async (sql) => {
  await sql`
	DELETE FROM daily_tips WHERE title IN('Bring your own cup', 'Enjoy your ice-cream with a cone', 'Carry a reusable water bottle', 'Carry a reusable shopping bag', 'Unsubscribe from newsletters you never read', 'Bring your own lunch to work') 
	`;
};
