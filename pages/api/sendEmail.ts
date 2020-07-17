// import {
//   selectSessionByTokenAndUsername,
//   insertUserChallenge,
//   checkChallengeByUserAndChallenge,
//   getUserById,
//   getChallengeById,
// } from '../../db';

import { selectUsersByStartDate } from '../../db';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
  console.log('reqbody cron job', req.body);

  const users = await selectUsersByStartDate();
  console.log('userzzzz', users);

  const msg = {
    to: 'alena.hasslacher@gmail.com',
    from: 'challenge@alenio.works',
    subject: 'Challenge reminder',
    text: `Hey there! you signed up for a challende ${req.body.challengeName} : ${req.body.challengeDescription}. The time to act is now!`,
  };

  await sgMail.send(msg);

  res.json({
    emailSend: true,
  });
}

//select from user_challenges where the startdate is < NOW();
//add a field email sent NEW DB QUERY selectUsersByStartDate
//so select all where its lesser than now AND email_sent field is FALSE
//so send the email and change the field email_sent to true
//but do I rrally need the function?? if i just pass in the user email? na prolly i shouldnt pass it like this.... but then how?
// obv like search users with startdate < NOW() => select their challenge  from challenges table by id from user_challenges table =>
