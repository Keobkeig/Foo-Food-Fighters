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
        <div>
            <h1>File Submission Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
