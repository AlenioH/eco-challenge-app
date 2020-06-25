exports.up = async (sql) => {
  await sql`
	INSERT INTO daily_tips(title, content, img) VALUES ('Say no to flyers and leaflets', 'By not taking flyers and leaflets you can convince businesses to switch to waste-free marketing strategies.','/flyers.png'),
	('Do not use plactic straws', 'Look at all those alternatives out there: bamboo, glass, stainless steel...', '/straws.png'),
	('Bring your own container', 'Besides the fact that some takeaways charge for their containers, you will be able to save a lot of waste!', '/container.png'),
	('Pick up one piece of trash today', 'By doing it you will prevent this piece of litter from being carried to the ocean, nature or ending up being eaten by animals.', '/trash.png')

	`;
};

//remove tips from databse

exports.down = async (sql) => {
  await sql`
	DELETE FROM products WHERE title IN('Say no to flyers and leaflets', 'Do not use plactic straws', 'Bring your own container', 'Pick up one piece of trash today') 
	`;
};
