import Head from 'next/head';
import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Link from 'next/link';

export default function Home(props) {
  // console.log(props.dailyTips); //logs out nicely, array of objects

  const day = new Date().getDay();
  const randomOne = props.dailyTips[day % props.dailyTips.length];

  // console.log(randomOne); //returns an object

  return (
    <div className="container">
      <Head>
        <title>So green Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main>
        <div className="desktop">
          <div className="topDiv">
            <div className="headers">
              <h1 className="welcomeH1">
                Welcome to <span className="welcome">So green!</span>
              </h1>
              <h2>Your personal guide to a more sustainable lifestyle</h2>
              <div className="missionSection">
                <img src="/photo1.jpg" alt="foggy forest"></img>
                <div className="sectionDescription">
                  <h1>Our mission</h1>
                  <p>
                    Our task is to encourage as many people as possible to make
                    as many as possible small steps towards saving our common
                    home. Become a hero now!
                  </p>
                </div>
              </div>
            </div>

            <div className="dailyTip">
              <h3>Daily Tip</h3>
              <h4>{randomOne.title}</h4>
              <img className="dailyTipImg" src={randomOne.img} alt=""></img>
              <p>{randomOne.content}</p>
            </div>
          </div>

          <div className="howItWorksSection">
            <div className="sectionDescription">
              <h1>How does it work?</h1>
              <p>
                You only need to choose a challenge out of the list of the
                existing ones and commit to it!
              </p>
              <Link href="/challenges">
                <a>
                  <button>Browse challenges</button>
                </a>
              </Link>
            </div>
            <img src="/photo2.jpg" alt="laptop and a cup of coffee"></img>
          </div>
        </div>

        <div className="mobile">
          <div className="topDiv">
            <div className="headers">
              <h1 className="welcomeH1">
                Welcome to <span className="welcome">So green!</span>
              </h1>
              <h2>Your personal guide to a more sustainable lifestyle</h2>
              <div className="missionSection">
                <img src="/photo1.jpg" alt="foggy forest"></img>
                <div className="sectionDescription">
                  <h1>Our mission</h1>
                  <p>
                    Our task is to encourage as many people as possible to make
                    as many as possible small steps towards saving our common
                    home. Become a hero now!
                  </p>
                </div>
              </div>
            </div>

            <div className="dailyTip">
              <div>
                <h3>Daily Tip</h3>
                <h4>{randomOne.title}</h4>
              </div>
              <img
                className="dailyTipImg"
                src={randomOne.img}
                alt="random tip"
              ></img>
              <p>{randomOne.content}</p>
            </div>
          </div>

          <div className="howItWorksSection">
            <div className="sectionDescription">
              <h1>How does it work?</h1>
              <p>
                You only need to choose a challenge out of the list of the
                existing ones and commit to it!
              </p>
              <Link href="/challenges">
                <a>
                  <button>Browse challenges</button>
                </a>
              </Link>
            </div>
            <img src="/photo2.jpg" alt="laptop and a cup of coffee"></img>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        * {
          line-height: 1.3rem;
        }
        .container {
          width: 100vw;
        }

        .welcomeH1 {
          margin-top: 120px;
          margin-left: 50px;
        }
        .welcome {
          color: black;
          text-shadow: 1px 1px black;
        }
        h2 {
          margin-left: 50px;
          margin-bottom: 80px;
        }
        .topDiv {
          width: 100%;
          display: flex;
          flex-direction: row;
        }
        .dailyTip {
          border: 1px solid white;
          border-bottom: none;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 30%;
          margin-left: auto;
          margin-top: 60px;
          margin-bottom: 80px;
          padding: 16px;
          height: calc(100vh - 50px);
        }
        .dailyTipImg {
          height: 200px;
          border-radius: 5px;
        }
        .missionSection {
          display: grid;
          grid-template-columns: 1fr 2fr;
          width: 90%;
          margin-top: 16px;
          margin-left: auto;
          margin-right: auto;
          line-height: 16px;
        }
        .howItWorksSection {
          display: grid;
          grid-template-columns: 2fr 1fr;
          width: 90%;
          margin-top: 96px;
          margin-left: auto;
          margin-right: auto;
          line-height: 2;
        }
        img {
          height: 350px;
          border-radius: 7px;
        }

        .sectionDescription {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 39px;
        }
        button {
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
          font-family: inherit;
          font-weight: 800;
          font-size: 20px;
          color: whitesmoke;
          background-color: #009432;
        }
        button:hover {
          background-color: #2f3640;
          transition: background-color 0.3s;
        }

        @media (max-width: 850px) {
          * {
            font-size: 2rem;
            line-height: 2rem;
          }
          .container {
            width: 100vh;
            margin-top: 7rem;
          }
          .desktop {
            display: none;
          }
          .topDiv {
            display: flex;
            flex-direction: column;
          }

          .headers {
            margin-top: 4rem;
          }

          .missionSection {
            margin-bottom: -8rem;
            display: flex;
            flex-direction: column;
            width: 100vh;
            margin-left: 2rem;
          }

          .dailyTip {
            width: 100vw;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 20px;
            margin-top: 0;
            border: none;
            padding: 20px;
            margin-left: auto;
            margin-right: auto;
          }

          .howItWorksSection img,
          .missionSection img {
            width: 450px;
          }
          .howItWorksSection {
            display: flex;
            flex-direction: column;
            width: 100vh;
            margin-top: -15rem;
            margin-left: 2rem;
          }
          .howItWorksSection button {
            padding: 20px;
            border-radius: 5px;
            margin-top: 10px;
            font-family: inherit;
            font-size: 3rem;
            font-weight: 800;

            color: whitesmoke;
            background-color: #009432;
          }

          h1 {
            line-height: 2rem;
          }
        }

        @media (min-width: 850px) {
          .mobile {
            display: none;
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
  require('dotenv').config();
  const { getTips } = await import('../db.js');
  const dailyTips = await getTips(context.params);

  return {
    props: {
      dailyTips,
    },
  };
}
