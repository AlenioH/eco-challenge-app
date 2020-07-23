import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import moment from 'moment';
// import checkChallenge from '../../components/checkChallenge';
import ChallengeCompletedButton from '../../components/ChallengeCompletedButton';
import DeleteChallengeButton from '../../components/DeleteChallengeButton';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
// import Checkbox from '@material-ui/core/Checkbox';
// import cookies from 'js-cookie';

import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
export default function ProfilePage(props) {
  // console.log('props from the profile page', props);
  const [checked, setChecked] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  console.log('user from page', props.user.id);

  // function handleClick(e) {
  //   setChecked(!checked);
  // }

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

  fetch('/api/checkSameUser', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ userId: props.user.id }),
  })
    .then((response) => {
      console.log('success', response);
      if (response.ok !== true) {
        throw new Error('Error fetching session');
      }
      // console.log(response.json);
      return response.json();
    })
    .then((json) => {
      if (json.sameUser === true) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    })
    .catch((err) => {
      setShowButtons(false);
      console.error('error fetching session', err);
    });

  return (
    <div classname="containerPage">
      <Head>
        <title>Profile page {props.user.username} </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="container">
        <h1>Your profile</h1>
        <h2>{props.user.username}</h2>
        <h3>Level: {props.userLevel}</h3>

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
                        {/* {challenge.days > 1 ? (
                          <>
                            <Checkbox
                              onChange={handleClick}
                              checked={checked}
                            />{' '}
                            <Checkbox /> <Checkbox /> <Checkbox />
                            <Checkbox /> <Checkbox /> <Checkbox />
                            {/* <input
                              type="checkbox"
                              checked={'checked'}
                              onChange={'handleClick'}
                            /> */}
                        {/* </>
                        ) : (
                          ''
                        )} */}
                        {showButtons === true ? (
                          <>
                            {' '}
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
                            </WhatsappShareButton>{' '}
                          </>
                        ) : (
                          ''
                        )}

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
                          Finished on:
                          {props.completedChallenges
                            .filter(
                              (item) => item.challenge_id === challenge.id,
                            )
                            .map((item) => item.finish_date.slice(0, 10))}
                        </p>
                        <p>
                          Completed{' '}
                          {props.completedChallenges
                            .filter(
                              (item) => item.challenge_id === challenge.id,
                            )
                            .map((item) => item.completed_times)}{' '}
                          time(s)
                        </p>
                        {showButtons === true ? (
                          <DeleteChallengeButton
                            challengeId={challenge.id}
                            userId={props.user.id}
                          />
                        ) : (
                          ''
                        )}
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

        @media (max-width: 850px) {
          * {
            font-size: 35px;
          }
          .containerPage {
            width: 100vh;
          }
          .container {
            width: 100vh;
            margin-top: 20rem;
          }
          .challenges {
            display: flex;
            flex-direction: column;
          }
          .activeChallenges,
          .completedChallenges {
            display: flex;
            flex-direction: column;
            width: 90%;
          }
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
    getUserLevel,
  } = await import('../../db');
  const user = await getUserById(context.params.id);

  const userLevel = await getUserLevel(user.id);
  console.log('userLevel id page', userLevel);
  const userChallenges = (await getChallengeByUserId(user.id)).map((item) => {
    return {
      ...item,
      start_date: item.start_date.toISOString().split('T')[0],
    };
  });

  //returns an array of objects: [
  //   { challenge_id: 2, user_id: 18 },
  //   count: 3,
  //   command: 'SELECT'
  // ]

  const chalId = userChallenges.map((item) => item.challenge_id) || [];
  // console.log('challenges ids from prof page', chalId); //array [ 5, 2 ]

  const challengesToShow =
    userChallenges.length > 0 ? await getChallengesByIds(chalId) : [];
  console.log('challengestoshow prof page', challengesToShow);
  //if i don't do it like that, the whole profile page crushes when there are no challenges

  const completedChallenges = await getCompletedChallengesByUserId(user.id);

  const complChalId = completedChallenges.map((item) => item.challenge_id);

  const completedToShow =
    completedChallenges.length > 0 ? await getChallengesByIds(complChalId) : [];

  return {
    props: {
      user: user,
      challengesToShow,
      userChallenges,
      completedToShow,
      completedChallenges,
      userLevel: userLevel.length > 0 ? userLevel[0].level : 'newbie',
    },
  };
}
