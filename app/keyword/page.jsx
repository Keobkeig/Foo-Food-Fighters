'use client';

import { useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Head from 'next/head';
import About from '../components/About';
import Credits from '../components/Credits';
import Navbar from '../components/Navbar';
import '../styles.css';

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
      <div className="flex justify-center items-center h-screen bg-blue-300">
        {!responseData ? (
          <form onSubmit={handleSubmit} className="w-64 p-4 border border-gray-300 rounded-lg bg-gray-100">
            <label className="mb-2 block text-blue-500">
              Enter Keyword here:
              <input type="text" value={text} onChange={handleChange} className="w-full py-1 px-2 rounded border border-gray-300 text-black" />
            </label>
            <button type="submit" className="w-full py-2 px-4 rounded bg-blue-500 text-white border-none">Submit</button>
          </form>
        ) : (
          <div className="w-64 p-4 border border-gray-300 rounded-lg bg-gray-100 text-black">
            {/* <h2 className="text-xl font-bold mb-4">Nutrition Label</h2>
            <div id="nutrition-label"></div> */}
            <h2 className="text-xl font-bold mb-4">Response Data</h2>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(responseData, null, 2)}</pre>
            <button
              onClick={() => setResponseData(null)}
              className="mt-4 py-2 px-4 rounded bg-blue-500 text-white border-none"
            >
              Submit Another Query
            </button>
          </div>
        )}
        {error && (
          <div className="w-64 p-4 mt-4 border border-red-300 rounded-lg bg-red-100">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
      <Credits />
    </>
  );
}
