import Tokens from 'csrf';
require('dotenv').config();
const argon2 = require('argon2');

import { insertUser, checkUsernameAndEmail } from '../../db';

export default async function register(req, res) {
  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN;
  const requestToken = req.body.csrf;
  console.log('secret2:', secret);

  if (typeof secret !== 'string') {
    throw new Error('Token secret misconfigured!');
  }

  console.log('req.body.csrf: ', req.body.csrf);
  console.log('req.body: ', req.body);

  const user = {
    username: req.body.username,
    email: req.body.email,
    password_hash: await argon2.hash(req.body.password),
  };

  const usersWithSameName = await checkUsernameAndEmail(user.username);

  if (tokens.verify(secret, requestToken)) {
    if (!usersWithSameName) {
      await insertUser(user)
        .then(() => console.log('succeeded!'))
        .catch((err) => console.error('didnt work', err));
    } else {
      console.log('user with this name already exists');
    }
  } else {
    console.error('CSRF WENT WRONG');
  }

  res.json({ signedUp: usersWithSameName === 0 });
}
