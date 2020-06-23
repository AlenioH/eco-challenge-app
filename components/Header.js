import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link href="/index">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/challenges">
            <a>Challenges</a>
          </Link>
        </li>
        <li>
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </li>
        <div className="login">
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>

          <li>
            <Link href="/login">
              <a>Sign up</a>
            </Link>
          </li>
        </div>
      </ul>
      <style jsx>{`
        .navigation {
          border-bottom: 2px solid black;
          position: fixed;
          top: 0;
          width: 100vw;
          background-image: url('/bg.jpg');
        }
        ul {
          list-style-type: none;
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-around;
          align-items: center;
          font-size: 1.4rem;
          font-weight: 800;
          padding-left: 3rem;
        }

        li a {
          color: black;
          text-shadow: 2px 2px white;
          text-decoration: none;
          padding: 0 3rem;
        }
        .login {
          margin-left: auto;
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
