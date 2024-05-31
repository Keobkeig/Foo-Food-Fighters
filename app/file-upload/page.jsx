'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function FileSubmissionPage() {
    const [selectedFile, setSelectedFile] = useState(null);

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
                    console.log(response.status);
                    console.log(response);
                })
                .catch((error) => {
                    // Handle any errors that occurred during the file submission
                    console.error(error);
                });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue-300">
            
            <form onSubmit={handleSubmit} className="w-100 p-4 border border-gray-300 rounded-lg bg-gray-100">
                <input type="file" onChange={handleFileChange} className="w-full py-1 px-2 rounded border border-gray-300 text-black"/>
                <button type="submit" className="w-full py-2 px-4 rounded bg-blue-500 text-white border-none">Submit</button>
            </form>
            
        </div>
    );
}