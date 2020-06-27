import React from 'react';
// import {GetServerSidePropsContext} from "next";
import Header from '../components/Header';
const queryString = require('query-string');

export default function register(props) {
  return (
    <div>
      <Header />
      <form method="POST">
        <input name="username" placeholder="username"></input>

        <input name="password" type="password" placeholder="password"></input>
        <input
          name="email"
          type="email"
          placeholder="example@example.com"
        ></input>
        <input type="hidden" name="csrf" value={props.csrfToken}></input>
        {props.createAccount === true ? (
          <>
            {' '}
            <label forHtml="email"></label>
            <input id="email" type="email" placeholder="email"></input>{' '}
          </>
        ) : (
          ''
        )}
        <button>submit</button>
        {/* <button onClick={() => setCreateAccount(!createAccount)}>
      Login{' '}
    </button> */}

        {/* <button onClick={() => setCreateAccount(true)}>
      Create an account
    </button> */}
      </form>
      <style jsx>{`
        form {
          margin-top: 10rem;
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
  const { insertUser } = await import('../db');

  let buffer = '';

  context.req.on('data', (chunk) => {
    buffer += chunk;
  });
  context.req.on('end', () => {
    const body = queryString.parse(Buffer.from(buffer).toString());
    const user = {
      username: body.username,
      password: body.password,
      email: body.email,
    };
    console.log(user);
    insertUser(user)
      .then(() => console.log('succeeded!'))
      .catch((err) => console.error('didnt work', err));
  });
  return {
    props: {
      csrfToken: 'TODO: Add real token here',
    },
  };
}
