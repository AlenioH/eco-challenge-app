// import crypto from 'crypto';
// import { serialize } from 'cookie';
import { selectSessionByToken } from '../../db';

export default async function checkLogin(req, res) {
  const token = req.cookies.token;
  console.log('COOKIES: ', req);
  const session = await selectSessionByToken(token);
  //because db query return an array we can do=>
  res.json(session.length > 0);
}
