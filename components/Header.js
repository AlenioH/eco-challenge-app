import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';

export default function Header() {
  Modal.setAppElement('body'); //i need this for accesability reasons so that screen reader only sees the modal when its open

  const [modalIsOpen, setModalIsOpen] = useState(false);
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
            <button onClick={() => setModalIsOpen(true)}>Login</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
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
              }}
            >
              <h3>Login</h3>
              <label forHtml="username"></label>
              <input id="username" type="text" placeholder="username"></input>
              <label forHtml="password"></label>
              <input
                id="password"
                type="password"
                placeholder="password"
              ></input>
              <button>Login</button>
              <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
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

        button {
          background-color: blueviolet;
          font-family: inherit;
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
// Modal.setAppElement('#app-base');
