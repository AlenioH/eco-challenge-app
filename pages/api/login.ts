import crypto from 'crypto';
import { serialize } from 'cookie';
import { selectUserByUsernameAndPassword, insertSession } from '../../db';

export default async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const users = await selectUserByUsernameAndPassword(username, password);
  console.log('query ran');
  if (users.length === 0) {
    console.log('denied login');
    res.json({ loggedIn: false });
  } else {
    console.log('logged in');

    const token = crypto.randomBytes(24).toString('base64'); //this creates a session token

    // const toStore = {
    //   token: token,
    //   username: users[0].username,
    //   user_id: users[0].id,
    // };
    // cannot store object inside a cookie

    const maxAge = 60 * 60 * 8; //session expires after 8 hours

    //it sets cookie called 'token' which i will not be able to access from JS.....

    //this inserts the session into the table
    await insertSession(users[0].id, users[0].username, token);

    //saving the session token in a cookie
    const cookie = serialize('token', token, {
      maxAge,
      expires: new Date(Date.now() + maxAge * 1000),
      //important for security
      //deny cookie access from JS
      httpOnly: true,
      //also important
      //set secure cookies on production
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    res.setHeader('Set-Cookie', cookie); //i guess this is the way i see it in the console afterwards

    //API resolved without sending a response for /api/login, this may result in stalled requests. => means it needs to send you some response back
    res.json({ loggedIn: true });
  }
}
