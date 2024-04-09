'use client';

import { useState } from 'react';

export default function FileSubmissionPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Perform file submission logic here
        if (selectedFile) {
            // Example: Upload the file to a server
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            // Make an API call to submit the file
            fetch('/api/submit-file', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log(data);
            })
            .catch(error => {
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