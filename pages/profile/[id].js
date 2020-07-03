import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function profilePage(props) {
  console.log('props from the profile page', props);
  return (
    <div>
      <Head>
        <title>Profile page</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="container">
        <h1>Username</h1>
        <h2>Level: god</h2>
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
          margin-top: 5rem;
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
  const { getUserById, getChallengeByUserId, getChallengeById } = await import(
    '../../db'
  );
  const user = await getUserById(context.params.id);
  const userChallenges = await getChallengeByUserId(context.params.id); //returns an object challenges: { challenge_id: 4, user_id: 18 }
  const challengesToShow = await getChallengeById(userChallenges.challenge_id);

  return {
    props: {
      user: user,
      challenges: userChallenges,
    },
  };
}
