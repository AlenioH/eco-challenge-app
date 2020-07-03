import { selectSessionByTokenAndUsername, insertUserChallenge } from '../../db';

export default async function addChallenge(req, res) {
  const token = req.cookies.token;
  const challengeId = req.body.challengeId;
  console.log('token from addChallenge API: ', token);
  console.log('challengeID from addCh API:', challengeId);

  const session = await selectSessionByTokenAndUsername(token);
  // console.log('SESSION:', session);

  //because db query return an array we can do=>
  // console.log(res.json(session.length));

  //the logic is like if there is a session existing, means the user is logged in => add challenge
  if (session.length !== 0) {
    await insertUserChallenge(challengeId, session[0].user_id)
      .then(() => console.log('challenge added successfully'))
      .catch((err) => console.error('addid challenge went wrong', err));
  }

  res.json(
    {
      addChallenge: true,
      id: session[0].user_id,
    },
    // username: cookiesPar.username,
    // id: cookiesPar.id,
  );
}
