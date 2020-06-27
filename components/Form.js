import React from 'react';

export default function Form(props) {
  return (
    <form method="POST">
      <input name="name" placeholder="username"></input>

      <input type="password" placeholder="password"></input>
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
  );
}

export async function getServerSideProps(context) {
  let buffer = '';

  context.req.on('data', (chunk) => {
    buffer += chunk;
  });
  context.req.on('end', () => {
    console.log(Buffer.from(buffer).toString());
  });
  return {
    props: {
      csrfToken: 'TODO: Add real token here',
    },
  };
}
