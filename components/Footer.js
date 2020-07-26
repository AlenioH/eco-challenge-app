import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="container">
      <div className="desktop">
        <ul>
          <li>
            <a href="https://www.instagram.com/wonder_deer/">
              <img src="/insta.png" alt="instagram"></img>
            </a>
          </li>

          <li>
            <a href="https://www.facebook.com/alena.hasslacher/">
              <img src="/fb.png" alt="facebook"></img>
            </a>
          </li>
          <li>
            <a href="https://github.com/AlenioH">
              <img src="/github.png" alt="github"></img>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/AHasslacher">
              <img src="/twitter.png" alt="twitter"></img>
            </a>
          </li>
          <li className="legal">
            Powered by coffee and kittens. Created by Alena Hasslacher. &copy;{' '}
            {new Date().getFullYear()}
          </li>
        </ul>
      </div>

      <div className="mobile">
        <ul>
          <li>
            <a href="https://www.instagram.com/wonder_deer/">
              <img src="/insta.png" alt="instagram"></img>
            </a>
          </li>

          <li>
            <a href="https://www.facebook.com/alena.hasslacher/">
              <img src="/fb.png" alt="facebook"></img>
            </a>
          </li>
          <li>
            <a href="https://github.com/AlenioH">
              <img src="/github.png" alt="github"></img>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/AHasslacher">
              <img src="/twitter.png" alt="twitter"></img>
            </a>
          </li>
        </ul>
        <p className="legal">
          Powered by coffee and kittens. Created by Alena Hasslacher. &copy;
          {new Date().getFullYear()}
        </p>
      </div>

      <style jsx>{`
        .container {
          margin-top: 4rem;
          width: 100%;
          border-top: 1px solid grey;
          width: 100%;
        }
        img {
          width: 30px;
        }
        ul {
          display: flex;
          flex-direction: row;
          list-style-type: none;
          justify-content: center;
          align-items: center;
        }
        li {
          padding: 0 1rem;
        }
        .legal {
          margin-left: auto;
          font-size: 80%;
        }

        @media (max-width: 850px) {
          .desktop {
            display: none;
          }
          .mobile ul {
            position: fixed;
            top: 40%;
            right: 0;
            display: flex;
            flex-direction: column;
          }

          .mobile img {
            width: 70px;
            margin: 1rem;
          }
        }

        @media (min-width: 850px) {
          .mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
