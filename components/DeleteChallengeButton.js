import React from 'react';
import Router from 'next/router';

export default function DeleteChallengeButton(props) {
  // console.log('props from button', props);
  function onClick() {
    fetch('/api/deleteChallenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challengeId: props.challengeId,
        userId: props.userId,
      }),
    })
      .then((response) => {
        if (response.ok !== true) {
          console.log('response from delete challenge not OK');
        }
        // console.log(response);
        return response.json();
      })
      .then((json) => {
        if (json.challengeDeleted === true) {
          console.log('challenge delete successfully!');
          alert('challenge was successfully deleted');

          Router.reload();
        } else {
          console.log('smth failed with challenge delete');
        }
      })
      .catch((err) => console.error('api challenge meh', err));
  }
  return (
    <div>
      <button onClick={onClick}>
        {' '}
        Remove challenge
        <style jsx>{`
          button {
            padding: 5px;
            border-radius: 5px;
            margin-bottom: 2rem;
            font-family: inherit;
            font-weight: 800;
            font-size: 0.8rem;
            color: whitesmoke;
            background-color: #6b8172;
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
      </button>
    </div>
  );
}
