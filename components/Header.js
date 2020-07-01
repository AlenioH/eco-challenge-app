import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

export default function Header(props) {
  // Modal.setAppElement('body'); //i need this for accesability reasons so that screen reader only sees the modal when its open

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [createAccount, setCreateAccount] = useState(false);

  const linkList = [
    { name: 'Home', url: '/' },
    { name: 'Challenges', url: '/challenges' },
    { name: 'Articles', url: '/articles' },
  ];

  const [user, setUser] = useState('');

  if (!user) {
    linkList.push({ name: 'Login', url: '/login' });
    linkList.push({ name: 'Sign up', url: '/register' });
  } else {
    linkList.push(
      { name: user, url: '/profile/' + user.id }, //is of course undefined ATM, but basically works
      { name: 'Logout', url: '/logout' },
    );
  }

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
        if (json === true) {
          setUser('Logged on as: IN PROGRESS');
        }
      })
      .catch((err) => {
        console.error('error fetching session', err);
      });
  }, [user]); //[user]??? //it doesnt log out the user if i dont put state var as a secod param
  console.log('USER: ', user);
  //as a second parameter to the useEffect function you pass in a state var you want to watch
  //in this case i don't have any state var it makes sense to watch, so leaving it empty means it will only run once
  //if user === null, then login and signup buttons shall be displayed, otherwise username and a logout button

  return (
    <div className="navigation">
      <ul>
        {linkList.map((item) => {
          return (
            <li key={item.url}>
              <Link href={item.url}>
                <a>{item.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* <ul>
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
            <li>
              <Link href="/login">
                <a>Login </a>
              </Link>
              <Link href="register">
                <a>Sign up</a>
              </Link>
            </li>
          </div>
        ) : (
          <div>
            {user} <button>Logout</button>
          </div>
        )}
      </ul> */}
      {/* <button onClick={() => setModalIsOpen(true)}>
              Login or Signup
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={customStyle}
            >
              <button className="close" onClick={() => setModalIsOpen(false)}>
                &times;
              </button>
              <Form modalIsOpen={modalIsOpen} createAccount={createAccount} /> */}
      {/* <form method="POST">
                <button className="close" onClick={() => setModalIsOpen(false)}>
                  &times;
                </button>

                <input name="name" placeholder="username"></input>

                <input type="password" placeholder="password"></input>
                <input
                  type="hidden"
                  name="csrf"
                  value={props.csrfToken}
                ></input>
                {createAccount === true ? (
                  <>
                    {' '}
                    <label forHtml="email"></label>
                    <input
                      id="email"
                      type="email"
                      placeholder="email"
                    ></input>{' '}
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
      {/* </form> */}
      {/* </Modal> */}

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
          margin-bottom: 0.4rem;
        }

        li a {
          color: black;
          text-shadow: 2px 2px white;
          text-decoration: none;
          padding: 0 3rem;
        }

        button {
          background-color: white;
          font-family: inherit;
          padding: 5px;
          border-radius: 5px;
          margin-right: 2rem;
          font-size: 1.2rem;
          margin-top: 5px;
        }

        button:hover {
          background-color: #2f3640;
          transition: background-color 0.3s;
        }
        .login {
          margin-left: auto;
        }

        input {
          padding: 7px;
          border-radius: 4px;
          margin-top: 5px;
        }

        .close {
          align-self: flex-end;
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

// export async function getServerSideProps(context) {
//   let buffer = '';

//   context.req.on('data', (chunk) => {
//     buffer += chunk;
//   });
//   context.req.on('end', () => {
//     console.log(Buffer.from(buffer).toString());
//   });
//   return {
//     props: {
//       csrfToken: 'TODO: Add real token here',
//     },
//   };
// }
