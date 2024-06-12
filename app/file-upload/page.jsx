'use client';

import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import About from '../components/About';
import Credits from '../components/Credits';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import '../styles.css';
import FoodDetails from '../components/FoodLabel';

import './style.css';

export default function FileSubmissionPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [useCamera, setUseCamera] = useState(false);

    const webcamRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const byteString = atob(imageSrc.split(',')[1]);
        const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        setSelectedFile(blob);

        const formData = new FormData();
        formData.append('file', blob);
        axios.post('http://127.0.0.1:5328/api/image-file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response.data);
                setResponseData(response.data);  // Store the response data in state
                setError(null);
            })
            .catch((error) => {
                console.error(error);
                setError('An error occurred during file submission.');
            });
    }, [webcamRef]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('http://127.0.0.1:5328/api/image-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);  // Store the response data in state
                    setError(null);
                })
                .catch((error) => {
                    console.error(error);
                    setError('An error occurred during file submission.');
                });
        }
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

                        <div className="center-container">
                            <article className="w-128 p-4 border border-gray-300 rounded-lg bg-gray-100 text-black">
                                {!responseData ? (
                                    <div>
                                        <button onClick={() => setUseCamera(!useCamera)}>
                                            {useCamera ? 'Use File Input' : 'Use Camera'}
                                        </button>
                                        {useCamera ? (
                                            <div className="webcam-container">
                                                <Webcam
                                                    audio={false}
                                                    ref={webcamRef}
                                                    screenshotFormat="image/jpeg"
                                                    className="webcam"
                                                />
                                                <button onClick={handleCapture} className="capture-button">Capture</button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit}>
                                                <input type="file" onChange={handleFileChange} />
                                                <button type="submit">Submit</button>
                                            </form>
                                        )}
                                    </div>
                                ) : (
                                    <div className="response-container">
                                        <FoodDetails data={responseData} />
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
                            </article>
                        </div>
                    </div>
                </div>
            </section>
            <Credits />
        </>
    );
}
