require('dotenv').config();

// require('./extractHerokuDatabaseEnvVars')(); will need that later for deployment
const argon2 = require('argon2');
const postgres = require('postgres');
const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

export async function getTips() {
  const dailyTips = await sql`
  SELECT * FROM daily_tips
  `;
  return dailyTips;
}

// export async function getTipsById(id) {
//   const dailyTip = await sql`
//   SELECT * FROM daily_tips WHERE id = ${id}`;
//   return dailyTip[0];
// } probably dont need that

export async function insertUser(user) {
  const userWithHashedPassword = {
    username: user.username,
    password_hash: await argon2.hash(user.password),
    email: user.email,
  };
  return sql`
  INSERT INTO users${sql(
    userWithHashedPassword,
    'username',
    'email',
    'password_hash',
  )}
  `;
}

// export async function selectUserByUsername(username) {
//   return sql`
//   SELECT * FROM users WHERE username = ${username}
//   `;
// }

export async function selectUserByUsernameAndPassword(username, password) {
  const usersWithUsername = await sql`
  SELECT * FROM users WHERE username = ${username}
  `; //select from always returns an array, even if its one
  console.log(usersWithUsername[0]);
  if (usersWithUsername.length === 0) return usersWithUsername;

  const passwordMatches = await argon2.verify(
    usersWithUsername[0].password_hash,
    password,
  ); //this returns boolean

  if (passwordMatches) {
    return usersWithUsername;
  } else {
    return [];
  }
}

export async function insertSession(userId, token) {
  return sql`
  INSERT INTO sessions(user_id, token) VALUES (${userId}, ${token})
  `;
}

export async function selectSessionByToken(token) {
  return sql`
  SELECT * FROM sessions WHERE token = ${token}
  `;
}
