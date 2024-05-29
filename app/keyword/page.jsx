'use client';

// To run: 'npx next dev' in git bash

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export default function TestPage() {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the submitted text
    console.log(text);

    // Make an API call to submit the text (to Jason's thingy)

    axios.post('http://127.0.0.1:5328/api/query', {query: text })
      .then((response) => {
        //take the json response and display it in the console
        response = response.data;
        console.log("Response from server:");
        console.log(response.data);

        console.log(response);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <form onSubmit={handleSubmit} className="w-64 p-4 border border-gray-300 rounded-lg bg-gray-100">
        <label className="mb-2 block text-blue-500">
          Enter Keyword here:
          <input type="text" value={text} onChange={handleChange} className="w-full py-1 px-2 rounded border border-gray-300 text-black" />
        </label>
        <button type="submit" className="w-full py-2 px-4 rounded bg-blue-500 text-white border-none">Submit</button>
      </form>
    </div>
  );
}


