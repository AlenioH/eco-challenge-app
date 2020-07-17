require('dotenv').config();
require('./extractHerokuDatabaseEnvVars')();

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
    password_hash: user.password_hash,
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
  // console.log(usersWithUsername[0]);
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

export async function checkUsernameAndEmail(username) {
  const usersWithUsername = await sql`
  SELECT * FROM users WHERE username = ${username}
  `; //select from always returns an array, even if its one
  // const usersWithEmail = await sql`
  // SELECT * FROM users WHERE email = ${email}
  // `;
  // console.log('emails from query', usersWithEmail.length);

  console.log('users from query', usersWithUsername.length);
  return usersWithUsername.length;
}

export async function checkEmail(email) {
  const usersWithEmail = await sql`
  SELECT * FROM users WHERE email = ${email}
  `;
  console.log('emails from query', usersWithEmail.length);
  return usersWithEmail.length;
}

export async function removeExpiredSessions() {
  await sql`
  DELETE FROM sessions WHERE expiry_timestamp < NOW();
  `;
}

export async function insertSession(userId, userName, token) {
  return sql`
  INSERT INTO sessions(user_id, user_name, token) VALUES (${userId}, ${userName}, ${token})
  `;
}

export async function selectSessionByTokenAndUsername(token) {
  return sql`
  SELECT * FROM sessions WHERE token = ${token} 
  `;
}

export async function removeSessionByToken(token) {
  return sql`
  DELETE FROM sessions WHERE token = ${token}
  `;
}

export async function getChallenges() {
  const challenges = await sql`
  SELECT * FROM challenges
  `;
  // console.log(challenges);
  return challenges;
}

export async function insertUserChallenge(
  challengeId,
  userId,
  startDate,
  emailSent,
) {
  return sql`
  INSERT INTO user_challenges(challenge_id, user_id, start_date, email_sent) VALUES (${challengeId}, ${userId}, ${startDate}, ${emailSent})
  `;
}

export async function getChallengeByUserId(userId) {
  const challenge = await sql`
  SELECT * FROM user_challenges WHERE user_id = ${userId}`;
  // console.log('user challenges from db query:', challenge);
  // return challenge;

  return challenge;
} //this function works  [
//   { challenge_id: 2, user_id: 18 },
//   { challenge_id: 5, user_id: 18 },
//   count: 2,
//   command: 'SELECT'
// ]

export async function getUserById(userId) {
  const user = await sql`
  SELECT * FROM users WHERE id IN (${userId})`;
  // SELECT * FROM challenges WHERE id IN (${challengeIds})
  // console.log('one user from db query:', user[0]);
  return user[0];
}
//1 user

export async function getUsersByIds(userId) {
  const users = await sql`
  SELECT * FROM users WHERE id IN (${userId})`;
  return users;
}

export async function getChallengeById(challengeId) {
  const userChallenges = await sql`
  SELECT * FROM challenges WHERE id = ${challengeId}`;
  // console.log('user challenge by id from db query:', userChallenges);

  return userChallenges;
}

//this returns multiple challenges
export async function getChallengesByIds(challengeIds) {
  const userChallenges = await sql`
  SELECT * FROM challenges WHERE id IN (${challengeIds})`; //passing in an array
  // console.log('user challenge by id from db query:', userChallenges);
  return userChallenges;
}

export async function completeChallenge(challengeId, userId) {
  await sql`
DELETE FROM user_challenges WHERE challenge_id = ${challengeId} AND user_id = ${userId}
`;
}

export async function checkChallengeByUserAndChallenge(challengeId, userId) {
  const userChallenges = await sql`
SElECT * FROM user_challenges WHERE challenge_id = ${challengeId} AND user_id = ${userId}

`;
  return userChallenges;
}

export async function insertIntoCompletedChallenges(
  challengeId,
  userId,
  finishDate,
) {
  await sql`
  INSERT INTO completed_challenges(challenge_id, user_id, finish_date) VALUES (${challengeId}, ${userId}, ${finishDate})
  `;
}

export async function getCompletedChallengesByUserId(userId) {
  const completedChallenges = await sql`
  SELECT * FROM completed_challenges WHERE user_id = ${userId}
  `;
  return completedChallenges;
}

export async function removeChallengeByUserAndChallengeId(challengeId, userId) {
  await sql`
  DELETE FROM completed_challenges WHERE challenge_id = ${challengeId} AND user_id = ${userId}
  `;
}

export async function selectUsersByStartDate() {
  const usersForLater = await sql`
  SELECT * FROM user_challenges WHERE start_date < NOW() 
  AND email_sent = false
  `;
  console.log('usersfromquery', usersForLater);
  return usersForLater;
}

export async function toggleEmail(userIds, challengeIds) {
  await sql`
  UPDATE user_challenges
  SET email_sent = true
  WHERE user_id IN (${userIds}) AND challenge_id IN (${challengeIds})
  
  `;
}
