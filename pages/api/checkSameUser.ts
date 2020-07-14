import { selectSessionByTokenAndUsername } from '../../db';

var cookie = require('cookie');

export default async function checkLogin(req, res) {
  const token = req.cookies.token;
  const userId = Number(req.body.userId);
  console.log('userid from check same user', userId);
  const session = await selectSessionByTokenAndUsername(token);
  console.log('session user id', session[0].user_id);
  const sessionUserId = Number(session[0].user_id);
  console.log('sessionnnn', session);

  //because db query return an array we can do=>
  // console.log(res.json(session.length));
  res.json({
    loggedIn: session.length > 0,
    username: session[0].user_name,
    id: session[0].user_id,
    sameUser: sessionUserId === userId,
  });
}
