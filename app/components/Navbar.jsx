import React from 'react';
import Link from 'next/link';
import '../styles.css';

const Navbar = () => {
    return <>
        <nav>
        <div className="menu">
            <Link href="/" className="website_name"><p>FOO FOOD FIGHTERS</p></Link>
            <div className="menu_links">
                <Link href="/" className="link">About</Link>
                <Link href="/file-upload" className="link">File Upload</Link>
                <Link href="/keyword" className="link">Keyword</Link>
            </div>
            <div className="menu_icon">
                <span className="icon"></span>
            </div>
        </div>
    </nav>
    </>
}

export default Navbar;