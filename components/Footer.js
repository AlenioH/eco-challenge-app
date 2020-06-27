import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="container">
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
        <li className="legal">Powered by coffee and kittens. &copy; 2020</li>
      </ul>
      <style jsx>{`
        .container {
          margin-top: 4rem;
          width: 100%;
          border-top: 1px solid grey;
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
        }
      `}</style>
    </div>
  );
}
