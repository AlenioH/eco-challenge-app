
import { selectSessionByTokenAndUsername } from '../../db';

var cookie = require('cookie');

export default async function checkLogin(req, res) {
  
  const token = req.cookies.token;

  console.log('token from checkLogin API: ', token);

  const session = await selectSessionByTokenAndUsername(token);
  // console.log('SESSION:', session);
  //get username from this query
  //because db query return an array we can do=>
  // console.log(res.json(session.length));
  res.json(
    {
      loggedIn: session.length > 0,
      username: session[0].user_name,
      id: session[0].user_id,
    },
    // username: cookiesPar.username,
    // id: cookiesPar.id,
  );
}
