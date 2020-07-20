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
          width: 100%;
        }
        .formContainer {
          margin-top: 8rem;
          display: flex;
          flex-direction: column;
          width: 100vh;
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

        @media (max-width: 850px) {
          .formContainer {
            margin-top: 13rem;
            height: 100vh;
            font-size: 50px;
          }
          .formContainer input,
          .formContainer button,
          .formContainer p {
            font-size: 30px;
          }

          input,
          button {
            padding: 30px;
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
