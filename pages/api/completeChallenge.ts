import {
  completeChallenge,
  insertIntoCompletedChallenges,
  selectSessionByTokenAndUsername,
  adjustUserLevel,
  insertUserIntoLevels,
  getUserLevel,
} from '../../db';

export default async function addChallenge(req, res) {
  const challengeId = req.body.challengeId;
  const userId = req.body.userId;
  const finishDate = req.body.finishDate;
  const session = await selectSessionByTokenAndUsername(req.cookies.token);
  // console.log('session', session);
  // console.log('userId from compl cha', userId);
  // console.log('session user id', session[0].user_id);

  // console.log('challengeID from completeCh API:', challengeId);
  // console.log('userid from compl chal api', userId);

  const userLevelObject = await getUserLevel(userId);

  //if there are completed challenges, take this number and increment by one, otherwise insert 1

  const userChalCompleted =
    userLevelObject.length > 0 ? userLevelObject[0].challenges_completed++ : 1;

  const level =
    userChalCompleted < 3
      ? 'Young Padawan'
      : userChalCompleted < 6
      ? 'Rising rock star'
      : userChalCompleted < 10
      ? 'Greta Thunberg'
      : userChalCompleted >= 10
      ? 'God'
      : '';
  //   if (userChalCompleted <= 2) {
  //     return 'young padawan';
  //   }
  //   if (userChalCompleted <= 5) {
  //     return 'rising rockstar';
  //   }
  //   if (userChalCompleted <= 9) {
  //     return 'Greta Thuneberg';
  //   }
  //   if (userChalCompleted >= 10) {
  //     return 'GOD';
  //   } else {
  //     return 'hoppala';
  //   }
  // };

  console.log('level fun', level);

  // const userLevel = userLevelObject.level
  //   ? userLevelObject.level
  //   : 'Young Padawan';

  userLevelObject.length === 0
    ? await insertUserIntoLevels(userId, 1, 'Young Padawan')
    : await adjustUserLevel(userId, level);

  // console.log('userlevelllll1133', userLevelObject[0].challenges_completed);

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
