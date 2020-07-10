import React, { useState } from 'react';
// import Alert from '@material-ui/core/Button';
// import AlertTitle from '@material-ui/core/Button';
import Calendar from 'react-calendar';

export default function AddChallengeButton(props) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [value, onChange] = useState(new Date());
  console.log('timeeee', value);
  // const [status, setStatus] = useState('');
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
        timeTillEmail: value,
      }),
    })
      .then((response) => {
        if (response.ok !== true) {
          console.log('response from add challenge not OK'); //there mb i can show status you need to log in
          alert('You need to log in to add challenges');
          // setStatus('need login');
        }
        console.log(response);
        return response.json();
      })
      .then((json) => {
        if (json.challengeExists === true) {
          alert('You already committed to this challenge!');
          //setStatus('already committed');
        } else {
          if (json.addChallenge === true) {
            console.log('challenge added successfully!');
            alert('challenge added successfully!');

            //setStatus('success');
          } else {
            console.log('smth failed with challenges');
          }
        }
      })
      .catch((err) => console.error('api challenge meh', err));
  }

  return (
    <div className="buttonContainer">
      {/* {status === 'need login' ? (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          <strong>You need to login </strong> to add challenges!
        </Alert>
      ) : (
        ''
      )}
      {status === 'already committed' ? (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          This is an info alert — <strong>check it out!</strong>
        </Alert>
      ) : (
        ''
      )}
      {status === 'success' ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert>
      ) : (
        ''
      )} */}
      <button className="showHideCal" onClick={(e) => setShowCalendar(true)}>
        Pick a start date
      </button>
      <div style={!showCalendar ? { display: 'none' } : { display: 'block' }}>
        <Calendar className="calendarStyle" onChange={onChange} value={value} />
        <button className="showHideCal" onClick={(e) => setShowCalendar(false)}>
          Close calendar
        </button>
      </div>
      <button onClick={onClick}> Challenge accepted</button>
      <style jsx>{`
        .buttonContainer {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

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

        .showHideCal {
          padding: 5px;
          border-radius: 4px;
          margin-bottom: 2rem;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.8rem;
          color: whitesmoke;
          background-color: #009432;
        }
      `}</style>
    </div>
  );
}
