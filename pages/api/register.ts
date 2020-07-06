import Tokens from 'csrf';
require('dotenv').config();
const argon2 = require('argon2');

import { insertUser, checkUsernameAndEmail, checkEmail } from '../../db';

export default async function register(req, res) {
  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN;
  const requestToken = req.body.csrf;
  // console.log('secret2:', secret);

  if (typeof secret !== 'string') {
    throw new Error('Token secret misconfigured!');
  }

  // console.log('req.body.csrf: ', req.body.csrf);
  // console.log('req.body: ', req.body);

  const user = {
    username: req.body.username,
    email: req.body.email,
    password_hash: await argon2.hash(req.body.password),
  };

  const usersWithSameName = await checkUsernameAndEmail(user.username);
  const usersWithSameEmail = await checkEmail(user.email);

  if (tokens.verify(secret, requestToken)) {
    if (!usersWithSameName) {
      if (!usersWithSameEmail) {
        await insertUser(user)
          .then(() => console.log('succeeded!'))
          .catch((err) => console.error('didnt work', err));
      } else {
        console.log('this email already exists');
      }
    } else {
      console.log('user with this name already exists');
    }
  } else {
    console.error('CSRF WENT WRONG');
  }

  res.json({
    usersWithThisName: usersWithSameName > 0,
    usersWithThisEmail: usersWithSameEmail > 0,
  });
}
