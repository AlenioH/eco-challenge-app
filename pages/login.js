import React, { useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import Router from 'next/router';

export default function Login() {
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
          setStatus('Login successful!');
          // Redirect to homepage after 2 seconds
          setTimeout(() => {
            Router.replace('/');
          }, 1000);
        } else {
          setStatus(
            'Login failed: make sure username and password are correct',
          );
          console.log('json.loggedIn', json.loggedIn);
        }
      })
      .catch(() => setStatus('Failed login'));
  }

  return (
    <div className="container">
      <Head>
        <title>So green login</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="formContainer">
        <h3>Login here</h3>
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

          <button>submit</button>
          <p>{status}</p>
        </form>
      </div>
      <style jsx>{`
        .container {
          width: 100vh;
        }
        .formContainer {
          margin-top: 8rem;
          display: flex;
          flex-direction: column;
          width: 50vh;
          margin-left: auto;
          margin-right: auto;
          align-items: center;
          border: 4px double white;
          border-radius: 5px;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }
        input {
          padding: 0.5rem;
          margin: 0.5rem;
          border-radius: 5px;
        }

        button {
          padding: 0.5rem;
          border-radius: 5px;
          font-weight: 800;
          font-size: 1rem;
          color: whitesmoke;
          background-color: #009432;
          margin-top: 1rem;
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

// export async function getServerSideProps() {
//   //--------------moved all of it to API routes!!1-----------------------

//   // const crypto = await import('crypto');
//   // const { selectUserByUsernameAndPassword } = await import('../db');
//   // let buffer = '';

//   // context.req.on('data', (chunk) => {
//   //   buffer += chunk;
//   // });
//   // context.req.on('end', () => {
//   //   const body = queryString.parse(Buffer.from(buffer).toString());
//   //   // const user = {
//   //   //   username: body.username,
//   //   //   password: body.password,
//   //   //   email: body.email,
//   //   // };
//   //   selectUserByUsernameAndPassword(body.username, body.password)
//   //     .then((user) => {
//   //       console.log('query ran');
//   //       if (user.length === 0) {
//   //         console.log('denied login');
//   //       } else {
//   //         console.log('logged in');
//   //         const sessionId = crypto.randomBytes(24).toString('base64');
//   //         const maxAge = 60 * 60 * 8; //session expires after 8 hours
//   //         //it sets cookie called 'token' which i will not be able to access from JS.....
//   //         const cookie = serialize('token', sessionId, {
//   //           maxAge,
//   //           expires: new Date(Date.now() + maxAge * 1000),
//   //           //important for security
//   //           //deny cookie access from JS
//   //           httpOnly: true,
//   //           //also important
//   //           //set secure cookies on production
//   //           secure: process.env.NODE_ENV === 'production',
//   //           path: '/',
//   //           sameSite: 'lax',
//   //         });
//   //         context.res.setHeader('Set-Cookie', cookie);
//   //       }
//   //     })
//   //     .catch((err) => console.log('nope', err));
//   // });
//   return {
//     props: {
//       csrfToken: 'TODO: Add real token here',
//     },
//   };
// }
