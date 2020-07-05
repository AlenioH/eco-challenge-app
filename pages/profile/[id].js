import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChallengeCompletedButton from '../../components/ChallengeCompletedButton';

export default function profilePage(props) {
  console.log('props from the profile page', props);

  return (
    <div>
      <Head>
        <title>Profile page {props.user.username} </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="container">
        <h1>Your profile</h1>
        <h2>{props.user.username}</h2>
        <div className="challenges">
          <div className="activeChallenges">
            <h3>Active challenges</h3>
            <ul>
              {props.challengesToShow.length > 0
                ? props.challengesToShow.map((challenge) => {
                    return (
                      <li key={challenge.id}>
                        <img src={challenge.img} alt="challenge"></img>

                        <h3>{challenge.name}</h3>
                        <p>Category: {challenge.category}</p>

                        <p>{challenge.description}</p>
                        <ChallengeCompletedButton
                          challengeId={challenge.id}
                          userId={props.user.id}
                        />
                      </li>
                    );
                  })
                : 'you have no active challenges'}
            </ul>
          </div>
          <div className="completed challenges">
            <h3>Completed challenges</h3>
          </div>
        </div>
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
        .challenges {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 2rem;
        }
        img {
          height: 300px;
          width: 200px;
          border-radius: 4px;
        }
        ul {
          list-style-type: none;
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
  // console.log('user from id page', user);
  const userChallenges = await getChallengeByUserId(context.params.id);
  // console.log('userChallenges from profile page', userChallenges);
  //returns an array of objects: [
  //   { challenge_id: 2, user_id: 18 },
  //   count: 3,
  //   command: 'SELECT'
  // ]

  const chalId = userChallenges.map((item) => item.challenge_id) || [];
  // console.log('challenges ids from prof page', chalId); //array [ 5, 2 ]

  const challengesToShow =
    userChallenges.length > 0 ? await getChallengesByIds(chalId) : [];
  console.log('challengestoshow prof page', challengesToShow); //if i don't do it like that, the whole profile page crushes when there are no challenges

  return {
    props: {
      user: user,
      // challenges: userChallenges, don't actually need it as a prop
      ...(challengesToShow ? { challengesToShow: challengesToShow } : []),
      // challengesToShow: challengesToShow,
    },
  };
}

// ...(cart ? { cart: cart } : undefined),
