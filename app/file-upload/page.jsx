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
            <h1 className="mb-2 block text-blue-500">File Submission Page</h1>
            <p>Submit a file to the server</p>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" style={{ backgroundColor: 'white', color: 'blue', padding: '10px' }}>Submit</button>
            </form>
        </div>
    );
}