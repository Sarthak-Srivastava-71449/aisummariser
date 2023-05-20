/* eslint-disable no-unused-vars */
import React from 'react';
import "./App.css"
import Top from './components/Top';
import Mainpart from './components/Mainpart'

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Top />
        <Mainpart />
      </div>
    </main>
  )
}

export default App
