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
  const timeTillEmail =
    req.body.tillEmail > 0 ? req.body.startDate + 25200000 : req.body.startDate; //logic is: if time before email is more than 0, then its a day in the future, adding to it will potentially make the email come at 7 am, otherwise take the time till email from body (less than zero)
  console.log('timme till email', timeTillEmail);
  console.log('till emaillll3333', req.body.tillEmail);
  // console.log('token from addChallenge API: ', token);
  // console.log('challengeID from addCh API:', challengeId);

  const session = await selectSessionByTokenAndUsername(token);
  // console.log('SESSION:', session);
  const userId = session[0].user_id;
  const user = await getUserById(userId);
  const challenge = await getChallengeById(challengeId);
  console.log('challende from add api', challenge[0].name);

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

      setTimeout(() => {
        sgMail.send(msg);
      }, timeTillEmail);
      // console.log('time from functiom', timeTillEmail); //this presumably still works if the value is negative, gets run immediately
      // if (timeTillEmail > 0) {
      //   setTimeout(() => {
      //     sgMail.send(msg);
      //   }, timeTillEmail); //2 minutes so if the time till email is not today, i should het the email in 1 min
      //   // timeTillEmail + 25200000); //at 7 am on the chosen day
      // } else {
      //   sgMail.send(msg);
      // }
      // sgMail.send(msg);
      console.log('challenge addedd successfully');

      // .catch((err) => console.error('addid challenge went wrong', err));
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
