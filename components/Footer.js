import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="container">
      <ul>
        <li>
          <Link href="https://www.instagram.com/wonder_deer/" prefetch={false}>
            <a>
              <img src="/insta.png" alt="instagram"></img>
            </a>
          </Link>
        </li>

        <li>
          <Link
            href="https://www.facebook.com/alena.hasslacher/"
            prefetch={false}
          >
            <a>
              <img src="/fb.png" alt="facebook"></img>
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/AlenioH" prefetch={false}>
            <a>
              <img src="/github.png" alt="github"></img>
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/AHasslacher" prefetch={false}>
            <a>
              <img src="/twitter.png" alt="twitter"></img>
            </a>
          </Link>
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
