// import {
//   selectSessionByTokenAndUsername,
//   insertUserChallenge,
//   checkChallengeByUserAndChallenge,
//   getUserById,
//   getChallengeById,
// } from '../../db';

import {
  selectUsersByStartDate,
  getUsersByIds,
  toggleEmail,
  getChallengesByIds,
  getChallengeById,
} from '../../db';
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
  console.log('chalIds for send email', chalIds); //[7, 10]

  const challenges =
    chalIds.length > 0 ? await getChallengesByIds(chalIds) : [];
  console.log('challengezzz', challenges);

  const userChallenges = users.map((item) => {
    return challenges.filter((challenge) => item.challenge_id === challenge.id);
  }); //this doesnt quite work...
  console.log('challleeeennnn', userChallenges);
  // userChallenges[0].name
  // challleeeennnn [
  //   [
  //     {
  //       id: 2,
  //       name: 'Earth hour',
  //       img: '/earth-hour.jpg',
  //       category: 'power',
  //       description: 'We all know the famous flashmob when the entire planet turns off the power for one hour. Good news is you can do it on any ot
  // her day!',
  //       days: 1
  //     }
  //   ]
  // ]

  const usersById = users.length > 0 ? await getUsersByIds(userIds) : [];
  //must be an array of objects
  console.log('usersbyId', usersById);

  const userEmails = usersById ? usersById.map((item) => item.email) : [];
  console.log('emailzzz', userEmails);

  //mb I need like a join... select from challenges where challenge_id == challenge.id...but the problem is that the challenge_id from user_challenges is an arrayyyy....

  //${users.map((item) => {
  //   return userChallenges[0].map(
  //     (challenge) => challenge.challenge_id === item.id,
  //   );
  // })}

  const msg = {
    to: userEmails,
    from: 'challenge@alenio.works',
    subject: 'Challenge reminder',
    text: `Hey there! you signed up for a challende 
    ${userChallenges[0].name} ${userChallenges[0].description} The time to act is now!`,
  };

  await toggleEmail(userIds, chalIds);

  await sgMail.send(msg);

  res.json({
    emailSend: true,
  });
}
