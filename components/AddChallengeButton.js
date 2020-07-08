import React from 'react';

export default function AddChallengeButton(props) {
  // console.log('props from button', props.challengeId);
  //props.time === is the difference in seconds between the date now and the picked date by the user
  function onClick() {
    fetch('/api/addChallenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challengeId: props.challengeId,
        timeTillEmail: props.time,
      }),
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
          }
        }
      })
      .catch((err) => console.error('api challenge meh', err));
  }

  return (
    <div>
      <button onClick={onClick}> Challenge accepted</button>
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
      `}</style>
    </div>
  );
}
