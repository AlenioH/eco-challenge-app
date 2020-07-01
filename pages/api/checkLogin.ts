// import crypto from 'crypto';
// import { serialize } from 'cookie';
import { selectSessionByToken } from '../../db';
import { parse } from 'cookie';
var cookie = require('cookie');

export default async function checkLogin(req, res) {
  // console.log('COOKIES: ', req.cookies.token); undefined
  // const cookiePar = cookie.parse(req.cookies.userAndToken);
  // console.log('TOKEN FROM COOKIES', JSON.parse(req.cookies.userAndToken)); //obviously i need to parse it
  const cookiePar = JSON.parse(req.cookies.userAndToken);
  const token = cookiePar.token;
  const name = cookiePar.username;
  console.log('NEW COOKIES PARSER: ', cookiePar.token);
  const session = await selectSessionByToken(token);
  //because db query return an array we can do=>
  res.json(session.length > 0);
}
