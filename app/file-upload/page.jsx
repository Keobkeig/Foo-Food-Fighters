'use client';

import React, { useState } from 'react';
import axios from 'axios';
// import './style.css';

export default function FileSubmissionPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Make an API call to submit the file using Axios
            axios.post('http://127.0.0.1:5328/api/image-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    // Handle the response from the server
                    console.log(response.data);
                    setResponseData(response.data);  // Store the response data in state
                    setError(null);
                })
                .catch((error) => {
                    // Handle any errors that occurred during the file submission
                    console.error(error);
                    setError('An error occurred during file submission.');
                });
        }
    };

return (
        <div className="flex justify-center items-center h-screen bg-blue-300">
            {!responseData ? (
                <form onSubmit={handleSubmit} >
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Submit</button>
                </form>
            ) : 
            // Display the response data if it exists
            (
                <div className="w-100 p-4 border border-gray-300 rounded-lg bg-gray-100">
                    <h2 className="text-xl font-bold mb-4">Response Data</h2>
                    <pre className="bg-gray-200 p-4 rounded text-black">
                        {JSON.stringify(responseData, null, 2)}
                    </pre>
                    <button
                        onClick={() => setResponseData(null)}
                        className="mt-4 py-2 px-4 rounded bg-blue-500 text-black border-none"
                    >
                        Upload Another File
                    </button>
                </div>
            )}
            {error && (
                <div className="w-100 p-4 mt-4 border border-red-300 rounded-lg bg-red-100">
                    <p className="text-red-700">{error}</p>
                </div>
            )}
        </div>
    );
}
