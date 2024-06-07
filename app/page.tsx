"use client"

import React, { useState, useEffect } from 'react';
import Parallax from 'parallax-js';
import './styles.css';

export default function Home() {

  useEffect(() => {
    var scene = document.getElementById('scene');
    if (scene) {
        new Parallax(scene);
    }
  }, []);  

  return (
    <div>
        {/* About Section */}
        <div className="about">
            <a className="bg_links social portfolio" href="https://www.rafaelalucas.com" target="_blank" rel="noopener noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank" rel="noopener noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links social github" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank" rel="noopener noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links logo"></a>
        </div>

        {/* Navigation */}
        <nav>
            <div className="menu">
                <p className="website_name">FOO FOOD FIGHTERS</p>
                <div className="menu_links">
                    <a href="" className="link">Home</a>
                    <a href="" className="link">Keyword</a>
                    <a href="" className="link">FileUpload</a>
                </div>
                <div className="menu_icon">
                    <span className="icon"></span>
                </div>
            </div>
        </nav>

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
    </div>
);
}
