// import {
//   selectSessionByTokenAndUsername,
//   insertUserChallenge,
//   checkChallengeByUserAndChallenge,
//   getUserById,
//   getChallengeById,
// } from '../../db';

import { selectUsersByStartDate, getUserById, toggleEmail } from '../../db';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
  const users = await selectUsersByStartDate();
  console.log('userzzzz', users);
  // userzzzz [
  //   {
  //     challenge_id: 2,
  //     user_id: 42,
  //     start_date: 2020-07-17T06:30:46.326Z,
  //      email_sent: false,
  //   },
  //   count: 1,
  //   command: 'SELECT'
  // ]

  const userIds = users.map((item) => item.user_id); // must be an array [42, 51]
  console.log('userIds for send email', userIds);
  const chalIds = users.map((item) => item.challenge_id);
  console.log('chalIds for send email', chalIds);
  const usersById = users.length > 0 ? await getUserById(userIds) : [];
  //must be an array of objects
  console.log('usersbyId', usersById);
  // const userEmails = usersById ? usersById.map((item) => item.email) : [];
  // console.log('emailzzz', userEmails);

  const msg = {
    to: usersById.email,
    from: 'challenge@alenio.works',
    subject: 'Challenge reminder',
    text: `Hey there! you signed up for a challende ${req.body.challengeName} : ${req.body.challengeDescription}. The time to act is now!`,
  };

  await toggleEmail(userIds, chalIds);

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
