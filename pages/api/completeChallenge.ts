import {
  completeChallenge,
  insertIntoCompletedChallenges,
  selectSessionByTokenAndUsername,
} from '../../db';

export default async function addChallenge(req, res) {
  const challengeId = req.body.challengeId;
  const userId = req.body.userId;
  const finishDate = req.body.finishDate;
  const session = await selectSessionByTokenAndUsername(req.cookies.token);
  console.log('session', session);
  console.log('userId from compl cha', userId);
  console.log('session user id', session[0].user_id);

  // console.log('challengeID from completeCh API:', challengeId);
  // console.log('userid from compl chal api', userId);

  await completeChallenge(challengeId, userId)
    .then(() => console.log('challenge completed successfully'))
    .catch((err) => console.error('completing challenge went wrong', err));

  await insertIntoCompletedChallenges(challengeId, userId, finishDate)
    .then(() => console.log('insert into completed successful'))
    .catch((err) => console.log('failed insert into completed', err));

  res.json({
    completeChallenge: true,
    intoCompleted: true,
    sameUser: session[0].user_id === req.body.userId,
  });
}
