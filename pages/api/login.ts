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

    const token = crypto.randomBytes(24).toString('base64');

    const maxAge = 60 * 60 * 8; //session expires after 8 hours
    //it sets cookie called 'token' which i will not be able to access from JS.....

    await insertSession(users[0].id, token);

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
    res.setHeader('Set-Cookie', cookie);
    //API resolved without sending a response for /api/login, this may result in stalled requests. => means it needs to send you some response back
    res.json({ loggedIn: true });
  }
}

// return {
//   props: {
//     csrfToken: 'TODO: Add real token here',
//   },
// };

// let buffer = '';

// context.req.on('data', (chunk) => {
//   buffer += chunk;
// });
// context.req.on('end', () => {
//   const body = queryString.parse(Buffer.from(buffer).toString());
//   // const user = {
//   //   username: body.username,
//   //   password: body.password,
//   //   email: body.email,
//   // };
