import React from 'react';
import {VscGithubInverted} from "react-icons/vsc";
import {TfiLinkedin} from "react-icons/tfi";

const Footer = () => {
  return (
    <footer>
        <p>Smart Brain - Face Recognition by Tom Rossner&copy; {new Date().getFullYear()}</p>
        <span>|</span>
        <div className='icons-container'>
            <a
                href="https://github.com/TomRossner"
                target="_blank"
                rel="noreferrer"
                className='nav-link'
                title='Tom Rossner on Github'
            >
                <VscGithubInverted className='icon' id='github'/>
            </a>
            <a
                href="https://www.linkedin.com/in/tom-rossner"
                target="_blank"
                rel="noreferrer"
                className='nav-link'
                title='Tom Rossner on LinkedIn'
            >
                <TfiLinkedin className='icon' id='linkedin'/>
            </a>
        </div>
    </footer>
  )
}

export default Footer;