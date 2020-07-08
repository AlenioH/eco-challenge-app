import {
  selectSessionByTokenAndUsername,
  insertUserChallenge,
  checkChallengeByUserAndChallenge,
  getUserById,
  getChallengeById,
} from '../../db';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function addChallenge(req, res) {
  const token = req.cookies.token;
  const challengeId = req.body.challengeId;
  const timeTillEmail = req.body.timeTillEmail;
  console.log('timmeeeee', timeTillEmail);
  // console.log('token from addChallenge API: ', token);
  // console.log('challengeID from addCh API:', challengeId);

  const session = await selectSessionByTokenAndUsername(token);
  // console.log('SESSION:', session);
  const userId = session[0].user_id;
  const user = await getUserById(userId);
  const challenge = await getChallengeById(challengeId);

  const userChallenges = await checkChallengeByUserAndChallenge(
    challengeId,
    userId,
  );

  //because db query return an array we can do=>
  // console.log(res.json(session.length));

  //the logic is like if there is a session existing, means the user is logged in => add challenge
  //if length of userChallenges is > 0 means the user already added this challenge
  if (session.length !== 0) {
    if (userChallenges.length === 0) {
      await insertUserChallenge(challengeId, session[0].user_id)
        .then(() => {
          const msg = {
            to: user.email,
            from: 'challenge@alenio.works',
            subject: 'Challenge reminder',
            text: `Hey there! you signed up for a challende ${challenge.name} : ${challenge.description}. The time to act is now! `,
          };
          setTimeout(() => {
            sgMail.send(msg);
          }, timeTillEmail);

          console.log('challenge addedd successfully');
        })
        .catch((err) => console.error('addid challenge went wrong', err));
    } else {
      console.log('challenge already exists');
    }
  }

  res.json(
    {
      addChallenge: true,
      id: session[0].user_id,
      challengeExists: userChallenges.length > 0,
    },
    // username: cookiesPar.username,
    // id: cookiesPar.id,
  );
}
