import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function challenges() {
  return (
    <div>
      <Header />
      CHALLENGES
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
