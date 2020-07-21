import React from 'react';
import Router from 'next/router';

export default function ChallengeCompletedButton(props) {
  // console.log('props from button', props);

  // const date = new Date();
  // console.log('date completed', date.slice(0, 10));

  function onClick() {
    fetch('/api/completeChallenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challengeId: props.challengeId,
        userId: props.userId,
        finishDate: new Date(),
      }),
    })
      .then((response) => {
        if (response.ok !== true) {
          console.log('response from completechallenge not OK');
        }

        return response.json();
      })
      .then((json) => {
        if (json.completeChallenge === true) {
          console.log('challenge complete successfully!');
          alert('congratulations! you rock!');

          Router.reload();
        } else {
          console.log('smth failed with challenge complete');
        }
      })
      .catch((err) => console.error('api challenge meh', err));
  }
  return (
    <div>
      <button onClick={onClick}> I made it!</button>
      <style jsx>{`
        button {
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 2rem;
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
          button {
            font-size: 30px;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
