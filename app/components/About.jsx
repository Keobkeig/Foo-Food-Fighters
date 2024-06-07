import React from 'react';
import Link from 'next/link';
import '../styles.css';

const About = () => {
    return <>
        {/* About Section */}
        <div className="about">
            <a className="bg_links social portfolio" href="https://docs.google.com/presentation/d/1RKkR4Gn1ErfyojjL3SQZ0STdPTwmteu1WJ1i8Gyh3UE/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links social dribbble" href="https://keobekigs-blog.vercel.app/" target="_blank" rel="noopener noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links social github" href="https://github.com/Keobkeig/Foo-Food-Fighters" target="_blank" rel="noopener noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links logo"></a>
        </div>
    </>    
}

export default About;