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
  // const timeTillEmail =
  //   req.body.tillEmail > 0 ? req.body.tillEmail + 25200000 : req.body.tillEmail; //logic is: if time before email is more than 0, then its a day in the future, adding to it will potentially make the email come at 7 am, otherwise take the time till email from body (less than zero)
  const timeTillEmail = req.body.tillEmail;

  console.log('till emaillll3333', req.body.tillEmail);
  // console.log('token from addChallenge API: ', token);
  // console.log('challengeID from addCh API:', challengeId);

  const session = await selectSessionByTokenAndUsername(token);
  // console.log('SESSION:', session);
  const userId = session[0].user_id;
  const user = await getUserById(userId);
  const challenge = await getChallengeById(challengeId);
  // console.log('challende from add api', challenge[0].name);

  const userChallenges = await checkChallengeByUserAndChallenge(
    challengeId,
    userId,
  );

  //60 000 ms in 1 min
  // 60000 * 60 * 13

  const msg = {
    to: user.email,
    from: 'challenge@alenio.works',
    subject: 'Challenge reminder',
    text: `Hey there! you signed up for a challende ${challenge[0].name} : ${challenge[0].description}. The time to act is now!`,
  };

  //because db query return an array we can do=>
  // console.log(res.json(session.length));

  //the logic is like if there is a session existing, means the user is logged in => add challenge
  //if length of userChallenges is > 0 means the user already added this challenge
  if (session.length !== 0) {
    if (userChallenges.length === 0) {
      await insertUserChallenge(
        challengeId,
        session[0].user_id,
        req.body.startDate,
      );
      // setTimeout(() => {
      //   sgMail.send(msg);
      // }, timeTillEmail);
      if (timeTillEmail < 0) {
        sgMail.send(msg);
      } else {
        fetch('./sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: req.body.startDate,
            userEmail: user.email,
            challengeName: challenge[0].name,
            challengeDescription: challenge[0].description,
          }),
        })
          .then((response) =>
            console.log('response from delayed email', response),
          )
          .catch((err) => console.error('error from delayed email', err));
      }

      console.log('challenge addedd successfully');
    } else {
      console.log('challenge already exists');
    }
  }

  res.json({
    addChallenge: true,
    id: session[0].user_id,
    challengeExists: userChallenges.length > 0,
  });
}
