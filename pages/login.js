import React, { useState } from 'react';
// import Link from 'next/link';
import Header from '../components/Header';
import Router from 'next/router';
//moved on to API routes
// import { serialize } from 'cookie';

// const queryString = require('query-string');

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  function onSubmit(e) {
    //props.csrf token
    //so on submit you kinda fetch this function from the API
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok !== true) {
          setStatus('failed log in');
        }
        console.log(response);
        return response.json();
      })
      .then((json) => {
        if (json.loggedIn === true) {
          setStatus('log in successful!');
          // Redirect to homepage after 2 seconds
          setTimeout(() => {
            Router.replace('/');
          }, 2000);
        } else {
          setStatus('failed log in');
          console.log('json.loggedIn', json.loggedIn); //returns json === undefined
        }
      })
      .catch(() => setStatus('Failed login'));
  }

  return (
    <div>
      <Header />
      <form method="POST" onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {/* {props.createAccount === true ? (
          <>
            {' '}
            <label forHtml="email"></label>
            <input id="email" type="email" placeholder="email"></input>{' '}
          </>
        ) : (
          ''
        )} */}
        <button>submit</button>
        <p>{status}</p>
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

export async function getServerSideProps() {
  //--------------moved all of it to API routes!!1-----------------------

  // const crypto = await import('crypto');
  // const { selectUserByUsernameAndPassword } = await import('../db');
  // let buffer = '';

  // context.req.on('data', (chunk) => {
  //   buffer += chunk;
  // });
  // context.req.on('end', () => {
  //   const body = queryString.parse(Buffer.from(buffer).toString());
  //   // const user = {
  //   //   username: body.username,
  //   //   password: body.password,
  //   //   email: body.email,
  //   // };
  //   selectUserByUsernameAndPassword(body.username, body.password)
  //     .then((user) => {
  //       console.log('query ran');
  //       if (user.length === 0) {
  //         console.log('denied login');
  //       } else {
  //         console.log('logged in');
  //         const sessionId = crypto.randomBytes(24).toString('base64');
  //         const maxAge = 60 * 60 * 8; //session expires after 8 hours
  //         //it sets cookie called 'token' which i will not be able to access from JS.....
  //         const cookie = serialize('token', sessionId, {
  //           maxAge,
  //           expires: new Date(Date.now() + maxAge * 1000),
  //           //important for security
  //           //deny cookie access from JS
  //           httpOnly: true,
  //           //also important
  //           //set secure cookies on production
  //           secure: process.env.NODE_ENV === 'production',
  //           path: '/',
  //           sameSite: 'lax',
  //         });
  //         context.res.setHeader('Set-Cookie', cookie);
  //       }
  //     })
  //     .catch((err) => console.log('nope', err));
  // });
  return {
    props: {
      csrfToken: 'TODO: Add real token here',
    },
  };
}
