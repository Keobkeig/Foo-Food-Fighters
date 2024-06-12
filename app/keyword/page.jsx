'use client';

import { useState } from 'react';
import axios from 'axios';
// import $ from 'jquery';
import Head from 'next/head';
import About from '../components/About';
import Credits from '../components/Credits';
import Navbar from '../components/Navbar';
import FoodLabel from '../components/FoodLabel';
import '../styles.css';
import './styles.css';

export default function TestPage() {
  const [text, setText] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make an API call to submit the text
    axios.post('http://127.0.0.1:5328/api/query', { query: text })
      .then((response) => {
        // Store the response data in state
        setResponseData(response.data);

        // $('#nutritional-label').nutritionalLabel(response.data);
        setError(null);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setError('An error occurred during the API call.');
      });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <About />
      <Navbar />
      <Head>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Archivo+Black" />
        <link rel="stylesheet" type="text/css" href="/bower_components/nutrition-label-jquery-plugin/dist/css/nutritionLabel-min.css" />
        <script type="text/javascript" src="/bower_components/jquery/dist/jquery.min.js" />
        <script type="text/javascript" src="/bower_components/nutrition-label-jquery-plugin/dist/js/nutritionLabel-min.js" />
      </Head>
      {/* Main Section */}
      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="text center-container input-group">
              <article className="w-128 p-4 border border-gray-300 rounded-lg bg-gray-100 text-black">
              {!responseData ? (
                <form onSubmit={handleSubmit}>
                  <label className="input-group-label article">
                    Enter Keyword Here:
                  </label>
                  <input type="text" value={text} class="input-group-input" onChange={handleChange} />
                  <button type="submit">Submit</button>
                </form>
              ) : (
                <div className="w-128 p-4 border border-gray-300 rounded-lg bg-gray-100 text-black">
                  {/* <h2 className="text-xl font-bold mb-4">Nutrition Label</h2>
            <div id="nutrition-label"></div> */}
                  {/* <h2 className="text-xl font-bold mb-4">Response Data</h2>
                  <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(responseData, null, 2)}</pre> */}
                  <FoodLabel food={responseData} />
                  <button
                    onClick={() => setResponseData(null)}
                    className="mt-4 py-2 px-4 rounded bg-blue-500 text-white border-none"
                  >
                    Submit Another Query
                  </button>
                </div>
              )}
              {error && (
                <div className="w-128 p-4 mt-4 border border-red-300 rounded-lg bg-red-100">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              </article>
            </div>
          </div>
        </div>
      </section>
      <Credits />
    </>
  );
}
