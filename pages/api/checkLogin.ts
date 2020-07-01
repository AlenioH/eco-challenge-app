// import crypto from 'crypto';
// import { serialize } from 'cookie';
import { selectSessionByTokenAndUsername } from '../../db';
import { parse } from 'cookie';
var cookie = require('cookie');

export default async function checkLogin(req, res) {
  // console.log('COOKIES: ', req.cookies.token); undefined
  // const cookiePar = cookie.parse(req.cookies.userAndToken);
  // console.log('TOKEN FROM COOKIES', JSON.parse(req.cookies.userAndToken)); //obviously i need to parse it
  // const cookiesPar = JSON.parse(req.cookies.userAndToken);
  // console.log(cookiesPar);
  // const token = cookiesPar.token;
  // const username = cookiesPar.username;
  // const userId = cookiesPar.user_id;

  const token = req.cookies.token;

  console.log('token: ', token);

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
