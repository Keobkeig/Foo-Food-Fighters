"use client"

import React, { useState, useEffect } from 'react';
import Parallax from 'parallax-js';
import './styles.css';
import Link from 'next/link';
import Navbar from './components/Navbar';
import About from './components/About';
import Credits from './components/Credits';

export default function Home() {

  useEffect(() => {
    var scene = document.getElementById('scene');
    if (scene) {
        new Parallax(scene);
    }
  }, []);  

  return (
    <>
    <div>
        <About />
        <Navbar />

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

                    <p className="main">Hey 👋</p>
                </div>

                <div className="text">
                    <article>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br />Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <button>Let's eat</button>
                    </article>
                </div>
            </div>
        </section>
        <Credits />
    </div>
    </>
    
);
}
