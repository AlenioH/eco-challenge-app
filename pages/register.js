import React, { useState } from 'react';
import Router from 'next/router';
import Header from '../components/Header';
import Head from 'next/head';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  function onSubmit(e) {
    //props.csrf token
    //so on submit you kinda fetch this function from the API
    e.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        csrf: props.csrfToken,
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => {
        if (response.ok !== true) {
          setStatus('sign up failed');
        }
        console.log(response);
        return response.json();
      })
      .then((json) => {
        if (json.usersWithThisName === true) {
          setStatus('user with this name already exists!');
          console.log('json.signedUp', json.usersWithThisName);
        } else {
          if (json.usersWithThisEmail === true) {
            setStatus('user with this email is already signed up');
            console.log('json.signedUp', json.usersWithThisEmail);
          } else {
            setStatus('signup successful');
            //Redirect to login page  after 2 seconds
            setTimeout(() => {
              Router.replace('/login');
            }, 2000);
          }
        }
      })
      .catch(() => setStatus('sign up no'));
  }
  return (
    <div>
      <Head>
        <title>So green sign up</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="formContainer">
        <h3>Sign up</h3>
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
          <input
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {/* <input type="hidden" name="csrf"></input> */}

          <button>submit</button>
          <p>{status}</p>
        </form>
      </div>
      <style jsx>{`
        .formContainer {
          margin-top: 8rem;
          display: flex;
          flex-direction: column;
          width: 50%;
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

export async function getServerSideProps() {
  require('dotenv').config();
  const Tokens = await (await import('csrf')).default;
  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN;
  // const secret = tokens.secretSync();
  console.log('secret: ', secret);

  //this secret gets generated new every time which you actually dont want, so mb put it in like .env
  // const { insertUser, checkUsernameAndEmail } = await import('../db');

  // let buffer = '';

  // context.req.on('data', (chunk) => {
  //   buffer += chunk;
  // });

  // context.req.on('end', async () => {
  //   const body = queryString.parse(Buffer.from(buffer).toString());
  //   const user = {
  //     username: body.username,
  //     password: body.password,
  //     email: body.email,
  //   };
  //   // const usersWithSameName = async function () {
  //   //   await checkUsernameAndEmail(user.username);
  //   // };

  //   const usersWithSameName = await checkUsernameAndEmail(body.username);

  //   console.log('usersWithSameName', usersWithSameName);

  //   const requestToken = body.csrf; //csrf is the 'name' attribute on the hidden input field
  //   console.log('requestToken: ', requestToken);
  //   //only if the request token matches, will user be inserted in the db

  //   if (tokens.verify(secret, requestToken)) {
  //     if (!usersWithSameName) {
  //       // console.log(user);
  //       // console.log(body);
  //       insertUser(user)
  //         .then(() => console.log('succeeded!'))
  //         .catch((err) => console.error('didnt work', err));
  //     } else {
  //       console.log('already exists');
  //     }
  //   } else {
  //     console.error('CSRF WENT WRONG');
  //   }
  // });
  return {
    props: {
      csrfToken: tokens.create(secret),
    },
  };
}
