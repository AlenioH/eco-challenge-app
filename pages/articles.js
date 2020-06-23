import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function articles(props) {
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
  console.log(props.data); //array of objects = atricles
  return (
    <div>
      <Header />

      {props.data.map((item) => {
        return (
          <div className="itemContainer" key={item.title}>
            <h4>{item.title}</h4>
            <img src={item.urlToImage} alt="alt"></img>
            <p>{item.description}</p>
            <Link href={item.url} prefetch={false}>
              <a>Keep reading</a>
            </Link>
            <p> {item.source.name}</p>
          </div>
        );
      })}
      <style jsx>{`
        img {
          width: 400px;
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
