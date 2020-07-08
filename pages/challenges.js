import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddChallengeButton from '../components/AddChallengeButton';
import Calendar from 'react-calendar';

// import Link from 'next/link';
// import OneChallenge from './[id]';

export default function Challenges(props) {
  // console.log('props from challenges page', props.oneChallenge);
  const [category, setCategory] = useState('all');
  const [value, onChange] = useState(new Date());
  //new Date() = current date and time 2020-07-08T09:06:50.057Z
  console.log('value calendar', value); //ok this value thing changes on click and shows the date you choose

  // onClickDay	Function called when the user clicks a day.	n/a	(value, event) => alert('Clicked day: ', value)
  return (
    <div>
      <Head>
        <title>So green Challenges</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="container">
        <label forHtml="category-select">Choose a category:</label>

        <select
          name="categories"
          id="category-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">--Please choose a category--</option>
          <option value="all">Show all</option>
          <option value="general">General</option>
          <option value="trash">Trash</option>
          <option value="power">Power</option>
          <option value="transportation">Transportation</option>
          <option value="food">Food</option>
        </select>

        <ul>
          {category === 'all'
            ? props.challenges.map((challenge) => {
                return (
                  <li key={challenge.id}>
                    <img src={challenge.img} alt="challenge"></img>

                    <h3>{challenge.name}</h3>
                    <p>Category: {challenge.category}</p>
                    <p>{challenge.description}</p>
                    <p>How many days it will take you: {challenge.days}</p>

                    <AddChallengeButton challengeId={challenge.id} />
                    <Calendar onChange={onChange} value={value} />
                  </li>
                );
              })
            : props.challenges
                .filter((challenge) => challenge.category === category)
                .map((challenge) => {
                  return (
                    <li key={challenge.id}>
                      <img src={challenge.img} alt="challenge"></img>

                      <h3>{challenge.name}</h3>
                      <p>Category: {challenge.category}</p>
                      <p>{challenge.description}</p>

                      <AddChallengeButton challengeId={challenge.id} />
                      <Calendar onChange={onChange} value={value} />
                    </li>
                  );
                })}
        </ul>

        {/* <ul>
          {props.challenges.map((challenge) => {
            return (
              <li key={challenge.id}>
                <img src={challenge.img} alt="challenge"></img>

                <h3>{challenge.name}</h3>
                <p>Category: {challenge.category}</p>
                <p>{challenge.description}</p>
                {/* <button onClick={onClick}>Challenge accepted!</button> */}
        {/* <AddChallengeButton challengeId={challenge.id} />
              </li>
            );
          })}
        </ul> */}
      </div>
      <Footer />
      <style jsx>{`
        .container {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10rem;
        }

        .react-calendar {
          width: 80%;
          color: red;
          border: 8px dotted pink;
        }

        ul {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 2rem;
          list-style-type: none;
        }

        img {
          height: 300px;
          width: 200px;
          border-radius: 4px;
        }
        li {
          border: 1px solid white;
          border-radius: 5px;
          padding: 1rem;
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
  const { getChallenges } = await import('../db');
  const challenges = await getChallenges(context.params);
  // console.log('challenges page: ', challenges); //is an array of objects
  return {
    props: {
      challenges,
    },
  };
}
