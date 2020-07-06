import { removeChallengeByUserAndChallengeId } from '../../db';

export default async function deleteChallenge(req, res) {
  const challengeId = req.body.challengeId;
  const userId = req.body.userId;

  // console.log('challengeID from completeCh API:', challengeId);
  // console.log('userid from compl chal api', userId);

  await removeChallengeByUserAndChallengeId(challengeId, userId)
    .then(() => console.log('challenge deleted successfully'))
    .catch((err) => console.error('deleting challenge went wrong', err));

  res.json({
    challengeDeleted: true,
  });
}
