import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChallengeCompletedButton from '../../components/ChallengeCompletedButton';
import DeleteChallengeButton from '../../components/DeleteChallengeButton';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
// import {
//   FacebookShareCount,
//   OKShareCount,
//   PinterestShareCount,
//   RedditShareCount,
//   TumblrShareCount,
//   VKShareCount,
// } from 'react-share';

import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
export default function profilePage(props) {
  // console.log('props from the profile page', props);

  //   <div className="Demo__some-network">
  //   <FacebookShareButton
  //     url={shareUrl}
  //     quote={title}
  //     className="Demo__some-network__share-button"
  //   >
  //     <FacebookIcon size={32} round />
  //   </FacebookShareButton>

  //   <div>
  //     <FacebookShareCount url={shareUrl} className="Demo__some-network__share-count">
  //       {count => count}
  //     </FacebookShareCount>
  //   </div>
  // </div>

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
                        <p>
                          Starting on:{' '}
                          {props.userChallenges
                            .filter(
                              (item) => item.challenge_id === challenge.id,
                            )
                            .map((item) => item.start_date.slice(0, 10))}
                        </p>
                        <ChallengeCompletedButton
                          challengeId={challenge.id}
                          userId={props.user.id}
                        />
                        <FacebookShareButton
                          url="https://so-green-eco-challenge.herokuapp.com/challenges"
                          quote={`Look what I'm up to! I accepted an eco challenge: ${challenge.name} : ${challenge.description}`}
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url="https://so-green-eco-challenge.herokuapp.com/challenges"
                          title={`Look what I'm up to! I accepted an eco challenge: ${challenge.name} : ${challenge.description}`}
                        >
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url="https://so-green-eco-challenge.herokuapp.com/challenges"
                          title={`Look what I'm up to! I accepted an eco challenge: ${challenge.name} : ${challenge.description}`}
                          separator=":: "
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        {/* <div>
                          <FacebookShareCount url="http://localhost:3000/profile/39">
                            {(count) => count}
                          </FacebookShareCount>
                        </div> no idea whar this does....*/}
                      </li>
                    );
                  })
                : 'you have no active challenges yet'}
            </ul>
          </div>
          <div className="completedChallenges">
            <h3>Completed challenges</h3>
            <ul>
              {props.completedToShow.length > 0
                ? props.completedToShow.map((challenge) => {
                    return (
                      <li key={challenge.id}>
                        <img src={challenge.img} alt="challenge"></img>

                        <h3>{challenge.name}</h3>
                        <p>Category: {challenge.category}</p>

                        <p>{challenge.description}</p>
                        <p>
                          Started on:
                          {props.userChallenges
                            .filter(
                              (item) => item.challenge_id === challenge.id,
                            )
                            .map((item) => item.start_date.slice(0, 10))}
                        </p>
                        <DeleteChallengeButton
                          challengeId={challenge.id}
                          userId={props.user.id}
                        />
                      </li>
                    );
                  })
                : 'you have no completed challenges yet'}
            </ul>
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

        h2 {
          color: whitesmoke;
          text-shadow: 1px 1px grey;
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
        .activeChallenges,
        .completedChallenges {
          display: flex;
          flex-direction: column;
        }
        button {
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
          font-family: inherit;
          font-weight: 800;
          font-size: 1.2rem;
          color: whitesmoke;
          background-color: #009432;
        }
        button:hover {
          background-color: #2f3640;
          transition: background-color 0.3s;
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
    getCompletedChallengesByUserId,
  } = await import('../../db');
  const user = await getUserById(context.params.id);

  // console.log('user from id page', user.id);
  const userChallenges = await getChallengeByUserId(user.id);
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
  // console.log('challengestoshow prof page', challengesToShow); //if i don't do it like that, the whole profile page crushes when there are no challenges

  const completedChallenges = await getCompletedChallengesByUserId(user.id);
  // console.log('completed challe', completedChallenges);
  const complChalId = completedChallenges.map((item) => item.challenge_id);

  const completedToShow =
    completedChallenges.length > 0 ? await getChallengesByIds(complChalId) : [];
  // console.log('completedtoshow', completedToShow);
  return {
    props: {
      user: user,
      // challenges: userChallenges, don't actually need it as a prop
      challengesToShow,
      userChallenges,
      completedToShow,
    },
  };
}
