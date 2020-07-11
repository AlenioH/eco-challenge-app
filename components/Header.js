import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import Router from 'next/dist/next-server/lib/router/router';
// const nextCookies = import('next-cookies');
// import Modal from 'react-modal';
// import Form from './Form';

// const customStyle = {
//   content: {
//     position: 'absolute',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     top: '40px',
//     left: '40px',
//     right: '40px',
//     bottom: '40px',
//     border: '1px solid #ccc',
//     background: '#fff',
//     overflow: 'auto',
//     WebkitOverflowScrolling: 'touch',
//     borderRadius: '4px',
//     outline: 'none',
//     padding: '20px',
//   },
//   overlay: {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%,-50%)',
//     boxSizing: 'border-box',
//     width: '600px',
//     borderRadius: '5px',

//     backgroundColor: 'rgba(255, 255, 255, 0.75)',
//     maxWidth: 'calc(100% - 80px)',
//     maxHeight: 'calc(100% - 20px)',
//   },
// };

export default function Header() {
  // Modal.setAppElement('body'); //i need this for accesability reasons so that screen reader only sees the modal when its open

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // // const [createAccount, setCreateAccount] = useState(false);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [status, setStatus] = useState('');

  const [user, setUser] = useState('');
  const [link, setLink] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch('/api/checkLogin', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        console.log('success', response);
        if (response.ok !== true) {
          throw new Error('Error fetching session');
        }
        console.log(response.json);
        return response.json();
      })
      .then((json) => {
        if (json.loggedIn === true) {
          setUser(json.username);

          setLink(json.id);
        }
      })
      .catch((err) => {
        console.error('error fetching session', err);
      });
  }, [user]); //[user]??? //it doesnt log out the user if i dont put state var as a secod param
  // console.log('USER: ', user);
  //as a second parameter to the useEffect function you pass in a state var you want to watch
  //in this case i don't have any state var it makes sense to watch, so leaving it empty means it will only run once
  //if user === null, then login and signup buttons shall be displayed, otherwise username and a logout button

  return (
    <div className="navigation">
      <div className="desktop">
        <ul>
          <li>
            <Link href="/">
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
          {!user ? (
            <div className="login">
              <Link href="/login">
                <a>Login </a>
              </Link>
              <Link href="register">
                <a>Sign up</a>
              </Link>
            </div>
          ) : (
            <div className="login">
              <Link href={'/profile/' + link}>
                <a>
                  {' '}
                  Logged in as <span className="username">{user}</span>
                </a>
              </Link>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </div>
          )}
        </ul>
      </div>

      <div className="mobile">
        <div className="logoAndButtonsMob">
          <Link href="/">
            <a>
              <img src="/logo.png" alt="green leaf"></img>
            </a>
          </Link>
          {user ? (
            <Link href={'/profile/' + link}>
              <a>
                <span className="username">{user}</span>
              </a>
            </Link>
          ) : (
            ''
          )}

          {showMenu === false ? (
            <button className="showMenu" onClick={() => setShowMenu(!showMenu)}>
              &#8801;
            </button>
          ) : (
            <button className="showMenu" onClick={() => setShowMenu(!showMenu)}>
              {' '}
              &times;{' '}
            </button>
          )}
        </div>

        {showMenu === true ? (
          <ul className="mobileList">
            <li>
              <Link href="/">
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
            {!user ? (
              <>
                <Link href="/login">
                  <a>Login </a>
                </Link>
                <Link href="register">
                  <a>Sign up</a>
                </Link>{' '}
              </>
            ) : (
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            )}
          </ul>
        ) : (
          ''
        )}
      </div>
      {/* <button onClick={() => setModalIsOpen(true)}>Login</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyle}
      >
        <button className="close" onClick={() => setModalIsOpen(false)}>
          &times;
        </button>
        {/* <Form modalIsOpen={modalIsOpen} /> */}
      {/* <form method="POST">
          <input
            name="name"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button onSubmit={onSubmit}>submit</button>
          <p>{status}</p>
        </form>
      </Modal> */}

      <style jsx>{`
        .navigation {
          border-bottom: 2px solid black;
          position: fixed;
          top: 0;
          width: 100%;
          background-image: url('/bg.jpg');
        }
        ul {
          list-style-type: none;
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-around;
          align-items: center;
          font-size: 22px;
          font-weight: 800;
          padding-left: 48px;
          margin-bottom: 7px;
        }

        li a {
          color: black;
          text-shadow: 2px 2px white;
          text-decoration: none;
          padding: 0 20px;
        }

        button {
          background-color: white;
          font-family: inherit;
          padding: 5px;
          border-radius: 5px;
          margin-right: 10px;
          font-size: 18px;
          margin-top: 5px;
        }

        button:hover {
          background-color: #2f3640;
          transition: background-color 0.3s;
        }
        .login {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          padding: 2px;
        }
        .login a {
          text-decoration: none;
          color: white;
          font-size: 12px;
          padding: 3px;
          border: 1px solid white;
          border-radius: 5px;
        }
        .username {
          text-decoration: underline;
        }
        .login a:hover {
          background-color: #2f3640;
          transition: background-color 0.3s;
        }

        input {
          padding: 7px;
          border-radius: 4px;
          margin-top: 5px;
        }

        .close {
          align-self: flex-end;
        }

        @media (max-width: 850px) {
          .desktop {
            display: none;
          }

          .mobile {
            display: flex;
            flex-direction: ${showMenu === true ? 'column' : 'row'};
            align-items: center;
          }

          .logoAndButtonsMob {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
          }

          .logoAndButtonsMob img {
            width: 200px;
            margin-right: auto;
          }

          button:hover {
            background-color: lightgray;
          }
          .navigation {
            height: ${showMenu === true ? '100%' : 'inherit'};
          }

          .showMenu {
            margin-left: auto;
            font-size: 30px;
            padding: 10px 14px;
            border-radius: 8px;
          }
          .mobile ul,
          .mobile ul a {
            font-size: 50px;
            padding-top: 30px;
            border-bottom: 2px solid black;
          }
          .mobile ul li {
            padding-top: 40px;
          }
          .mobile {
            display: flex;
            flex-direction: column;
          }
          a {
            text-decoration: none;
            color: inherit;
            text-shadow: 2px 2px white;
            font-size: 30px;
          }
        }
        @media (min-width: 850px) {
          .mobile {
            display: none;
          }
        }
        .mobileList {
          display: flex;
          flex-direction: column;
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
{
  /* // @media only screen and (max-width: 600px)  {...}
// What this query really means, is “If [device width] is less than or equal to 600px, then do {…}” */
}
