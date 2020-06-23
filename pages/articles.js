import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Head from 'next/head';

export default function Articles(props) {
  console.log(props.data); //array of objects = atricles
  return (
    <div>
      <Head>
        <title>So green Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="container">
        {props.data.map((item) => {
          return (
            <div className="articleContainer" key={item.title}>
              <img src={item.urlToImage} alt="alt"></img>
              <div className="articleText">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.url} prefetch={false}>
                  <a>Keep reading</a>
                </Link>
                <p className="source"> Source: {item.source.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .container {
          width: 90%;
          display: flex;
          flex-direction: column;
          margin-left: auto;
          margin-right: auto;
        }
        img {
          width: 400px;
          border-radius: 5px;
        }

        h3 {
          text-shadow: 2px 2px wheat;
        }

        .articleContainer {
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-gap: 4rem;
          margin-top: 5rem;
          font-size: 1.2rem;
        }
        a {
          text-decoration: none;
          padding: 10px;
          border-radius: 5px;
          font-family: inherit;
          font-weight: 800;
          font-size: 1.2rem;
          color: whitesmoke;
          background-color: #009432;
        }
        a:hover {
          background-color: #2f3640;
          transition: background-color 0.3s;
        }
        .source {
          font-size: 0.8rem;
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

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    'https://newsapi.org/v2/everything?q=climate&sortBy=popularity&apiKey=7641b2bfa2ab4f41ade4a9b7be34c616',
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.articles } };
}

//7641b2bfa2ab4f41ade4a9b7be34c616 newsapi.org key

// const url =
//   // 'http://newsapi.org/v2/everything?' +
//   // 'q=sustainability&' +
//   // 'sortBy=popularity&' +
//   // 'apiKey=7641b2bfa2ab4f41ade4a9b7be34c616';
//   'https://newsapi.org/v2/everything?q=climate&sortBy=popularity&apiKey=7641b2bfa2ab4f41ade4a9b7be34c616';

// const req = new Request(url);

// fetch(req)
//   .then(function (response) {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data.articles); //arary of obj
//     return data.articles;
//   });
