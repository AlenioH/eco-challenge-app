import Head from 'next/head';
import React from 'react';
import Header from '../components/Header.js';
import Link from 'next/link';
import { ThemeProvider } from '@chakra-ui/core';
import { theme } from '@chakra-ui/core';

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>So green Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
      <Header />
      <main>
        <h1 className="welcomeH1">
          Welcome to <span className="welcome">So green!</span>
        </h1>
        <h2>Your personal guide to a more sustainable lifestyle</h2>
        <div className="missionSection">
          <img src="/photo1.jpg" alt="foggy forest"></img>
          <div className="sectionDescription">
            <h1>Our mission</h1>
            <p>
              Our task is to encourage as many people as possible to make as
              many as possible small steps towards saving our common home.
              Become a hero now!
            </p>
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
      </main>
      <style jsx>{`
        .welcomeH1 {
          margin-top: 10rem;

          margin-left: 3rem;
        }
        .welcome {
          color: black;
          text-shadow: 1px 1px black;
        }
        h2 {
          margin-left: 3rem;
          margin-bottom: 5rem;
        }
        .missionSection {
          display: grid;
          grid-template-columns: 2fr 1fr;
          width: 90%;
          margin-top: 2rem;
          margin-left: auto;
          margin-right: auto;
          line-height: 2rem;
        }
        .howItWorksSection {
          display: grid;
          grid-template-columns: 1fr 2fr;
          width: 90%;
          margin-top: 6rem;
          margin-left: auto;
          margin-right: auto;
          line-height: 2rem;
        }
        img {
          height: auto;
          border-radius: 7px;
        }

        .sectionDescription {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 2rem;
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
