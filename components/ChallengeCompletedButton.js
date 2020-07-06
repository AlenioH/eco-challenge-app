import React from 'react';
import Router from 'next/router';

export default function ChallengeCompletedButton(props) {
  // console.log('props from button', props);

  // useEffect(() => {
  //   function handleStatusChange(status) {
  //     setIsOnline(status.isOnline);
  //   }

  function onClick() {
    fetch('/api/completeChallenge', {
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
          console.log('response from completechallenge not OK');
        }
        console.log(response);
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
  return <button onClick={onClick}> I made it!</button>;
}
