import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { GetServerSidePropsContext } from 'next';

export default function Logout() {
  return (
    <div className="container">
      <Header />
      <Head>
        <title>Logged out</title>
      </Head>
      <div className="paragraphContainer">
        <h3>
          You are successfully logged out! Hope to see you soon again {'\u2728'}{' '}
          <span role="img" aria-label="unicorn">
            🦄
          </span>
        </h3>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
        }

        h3 {
          margin-top: 8rem;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { serialize } = await import('cookie');
  const nextCookies = (await import('next-cookies')).default;
  const { removeSessionByToken } = await import('../db');

  const { token } = nextCookies(context);
  await removeSessionByToken(token);

  // Remove the cookie
  context.res.setHeader(
    'Set-Cookie',
    serialize('userAndToken', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    props: {},
  };
}
