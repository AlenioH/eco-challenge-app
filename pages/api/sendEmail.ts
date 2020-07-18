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

  const userChal = challenges.filter((item) => item.id === users.challenge_id);
  console.log('userchalll', userChal);
  // challengezzz [
  //   {
  //     id: 1,
  //     name: 'Reusable water bottle for one week',
  //     img: '/challenge-bottle.jpg',
  //     category: 'trash',
  //     description: 'Look at the huge variety of those bottles: there is bamboo, glass, stainless steel...Just pick yours and avoid all that plasti c

  //  trash!',
  //     days: 7
  //   },
  //   {
  //     id: 3,
  //     name: 'Veggie day',
  //     img: '/veggie-day.jpg',
  //     category: 'food',
  //     description: 'Switching to a veggie diet does not only improve your health, but also helps to save the environment. Try going vegetarian or v
  // egan for a day!',
  //     days: 1
  //   },
  //   count: 2,
  //   command: 'SELECT'
  // ]

  const usersById = users.length > 0 ? await getUsersByIds(userIds) : [];
  //must be an array of objects
  console.log('usersbyId', usersById);

  const userEmails = usersById ? usersById.map((item) => item.email) : [];
  console.log('emailzzz', userEmails);

  //user chalenge = challenges.filter((item) => item.id === )
  //mb like get challenge by id, but actually i kinda need all of them

  const msg = {
    to: userEmails,
    from: 'challenge@alenio.works',
    subject: 'Challenge reminder',
    text: `Hey there! you signed up for a challende ${userChal.name} ${userChal.description} The time to act is now!`,
  };

  await toggleEmail(userIds, chalIds);

  await sgMail.send(msg);

  res.json({
    emailSend: true,
  });
}
