import {
  selectUsersByFinishDate,
  getUsersByIds,
  toggleSecondEmail,
} from '../../db';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendSecondEmail(req, res) {
  const users = (await selectUsersByFinishDate()) || [];
  console.log('userzzzz', users);

  const userIds = users.map((item) => item.user_id); // must be an array [42, 51]
  console.log('userIds for send email', userIds);

  const chalIds = users.map((item) => item.challenge_id);
  // console.log('chalIds for send email', chalIds); //[7, 10]

  const usersById = users.length > 0 ? await getUsersByIds(userIds) : [];
  //must be an array of objects
  console.log('usersbyId', usersById);

  const userEmails = usersById ? usersById.map((item) => item.email) : [];
  console.log('emailzzz', userEmails);

  const msg = {
    to: userEmails,
    from: 'challenge@alenio.works',
    subject: 'How did your challenge go?',
    text: `Hey there! The time of your challenge is up. Congratulations on making it! Login under your username and share your experience on social media. Spread the word! Remember: you are a hero! Best, Alenio.`,
    html: `<p>Hey there! <br> The time of your challenge is up. Congratulations on making it!
    <a href='https://so-green-eco-challenge.herokuapp.com/login'> Login </a> under your username and share your experience on social media. Spread the word! <br>Remember: you are a hero!<br> Best, Alenio.</p>`,
  };

  await toggleSecondEmail(userIds, chalIds);

  await sgMail.send(msg);

  res.json({
    emailSend: true,
  });
}
