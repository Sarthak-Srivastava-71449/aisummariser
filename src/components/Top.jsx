/* eslint-disable no-unused-vars */
import React from 'react';
import "./Mainpart.css";


const Top = () => {
  return (
    <header className='head'>
      <nav className='navbar'>
            <h1 className="w-28 object-contain">AI Summariser</h1>
            <button type='button' onClick={() => {
                window.location.href = "https://github.com/Sarthak-Srivastava-71449"
            }} className="black_btn">Github</button>
        </nav>

        <h1 className="head_text">Summarise Articles with <br />
        <span className="orange">Open AI</span>
        </h1>
    </header>
  )
}

export default Top
