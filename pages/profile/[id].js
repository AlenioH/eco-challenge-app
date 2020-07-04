import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function profilePage(props) {
  console.log('props from the profile page', props);

  return (
    <div>
      <Head>
        <title>Profile page {props.user.username}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="container">
        <h1>Your profile</h1>
        <h2>{props.user.username}</h2>

        <h3>Active challenges</h3>

        <h3>Completed challenges</h3>
      </div>
      <Footer />
      <style jsx>{`
        .container {
          width: 90%;
          margin: 0 auto;
        }

        h1 {
          margin-top: 10rem;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'DM Mono', monospace;
          background-color: #b8e994;
          color: #2f3640;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    getUserById,
    getChallengeByUserId,
    getChallengesByIds,
  } = await import('../../db');
  const user = await getUserById(context.params.id);
  const userChallenges = await getChallengeByUserId(context.params.id); //returns an array of objects: [
  //   { challenge_id: 2, user_id: 18 },
  //   count: 3,
  //   command: 'SELECT'
  // ]

  const chalId = userChallenges.map((item) => item.challenge_id);
  console.log(chalId); //array [ 5, 2 ]

  const challengesToShow = await getChallengesByIds(chalId);
  console.log('challengestoshow', challengesToShow);

  return {
    props: {
      user: user,
      // challenges: userChallenges, don't actually need it as a prop
      challengesToShow: challengesToShow,
    },
  };
}
