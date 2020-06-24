import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';

const customStyle = {
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
  overlay: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    boxSizing: 'border-box',
    width: '600px',
    borderRadius: '5px',

    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    maxWidth: 'calc(100% - 80px)',
    maxHeight: 'calc(100% - 80px)',
  },
};

export default function Header() {
  Modal.setAppElement('body'); //i need this for accesability reasons so that screen reader only sees the modal when its open

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
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
            <button onClick={() => setModalIsOpen(true)}>
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
              <label forHtml="username"></label>
              <input id="username" type="text" placeholder="username"></input>
              <label forHtml="password"></label>
              <input
                id="password"
                type="password"
                placeholder="password"
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
              <button onClick={() => setCreateAccount(!createAccount)}>
                Login{' '}
              </button>

              <button onClick={() => setCreateAccount(true)}>
                Create an account
              </button>
            </Modal>
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
