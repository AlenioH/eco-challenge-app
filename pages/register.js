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
  const Tokens = await (await import('csrf')).default;
  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN;
  // const secret = tokens.secretSync();
  console.log('secret: ', secret);

  //this secret gets generated new every time which you actually dont want, so mb put it in like .env
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
    const requestToken = body.csrf; //csrf is the 'name' attribute on the hidden input field
    //only if the request token matches, will user be inserted in the db
    console.log('requestToken: ', requestToken);
    if (tokens.verify(secret, requestToken)) {
      // console.log(user);
      // console.log(body);
      insertUser(user)
        .then(() => console.log('succeeded!'))
        .catch((err) => console.error('didnt work', err));
    } else {
      console.error('CSRF WENT WRONG');
    }
  });
  return {
    props: {
      csrfToken: tokens.create(secret),
    },
  };
}
