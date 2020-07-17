// import {
//   selectSessionByTokenAndUsername,
//   insertUserChallenge,
//   checkChallengeByUserAndChallenge,
//   getUserById,
//   getChallengeById,
// } from '../../db';

import { selectUsersByStartDate, getUsersByIds, toggleEmail } from '../../db';
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
  const usersById = users.length > 0 ? await getUsersByIds(userIds) : [];
  //must be an array of objects
  console.log('usersbyId', usersById);
  const userEmails = usersById ? usersById.map((item) => item.email) : [];
  console.log('emailzzz', userEmails);

  const msg = {
    to: userEmails,
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
