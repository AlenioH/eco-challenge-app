import { completeChallenge } from '../../db';

export default async function addChallenge(req, res) {
  const challengeId = req.body.challengeId;
  const userId = req.body.userId;

  // console.log('challengeID from completeCh API:', challengeId);
  // console.log('userid from compl chal api', userId);

  await completeChallenge(challengeId, userId)
    .then(() => console.log('challenge completed successfully'))
    .catch((err) => console.error('completing challenge went wrong', err));

  res.json({
    completeChallenge: true,
  });
}
