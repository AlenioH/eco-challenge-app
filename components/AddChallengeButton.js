import React from 'react';

export default function AddChallengeButton(props) {
  console.log('props from button', props);
  function onClick() {
    fetch('/api/addChallenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ challengeId: props.challengeId }),
    })
      .then((response) => {
        if (response.ok !== true) {
          console.log('response from add challenge not OK'); //there mb i can show status you need to log in
          alert('You need to log in to add challenges');
        }
        console.log(response);
        return response.json();
      })
      .then((json) => {
        if (json.challengeExists === true) {
          alert('You already committed to this challenge!');
        } else {
          if (json.addChallenge === true) {
            console.log('challenge added successfully!');
            alert('challenge added successfully!');
            // Redirect to homepage after 2 seconds
            // setTimeout(() => {
            //   Router.replace('/');
            // }, 1000);
          } else {
            console.log('smth failed with challenges');
            console.log('json.addchallenge', json.addChallenge);
          }
        }
      })
      .catch((err) => console.error('api challenge meh', err));
  }
  return <button onClick={onClick}> Challenge accepted</button>;
}
