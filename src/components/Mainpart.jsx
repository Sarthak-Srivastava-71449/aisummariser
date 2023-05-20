/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLazyGetSummaryQuery } from '../api/artapi';
import './Mainpart.css'

const Mainpart = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });

    

    const [prevArticles, setprevArticles] = useState([])
    const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [ getSummary, {error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
      const fromStorage = JSON.parse(localStorage.getItem('articles'))
      if (fromStorage) {
        setprevArticles(fromStorage)
      }
    }, [])

    const handleVoiceChange = (e) => {
      setSelectedVoice(e.target.value);
    };
  
    const handleSpeedChange = (e) => {
      setSelectedSpeed(parseFloat(e.target.value));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url});

        if(data?.summary){
          const newArticle = { ...article, summary: data.summary};
          const history = [newArticle, ...prevArticles]
          setArticle(newArticle);
          setprevArticles(history)
          localStorage.setItem('articles', JSON.stringify(history))
        }
    }

    const handleSpeech = () => {
      const speech = new SpeechSynthesisUtterance(article.summary);
      speech.rate = selectedSpeed; // Speech speed (1 is the default)
      const voices = speechSynthesis.getVoices();
      const selectedVoiceObj = voices.find((voice) => voice.name === selectedVoice);
      speech.voice = selectedVoiceObj; // Select the first voice (you can change it to any available voice)
      speechSynthesis.speak(speech);
    };
  
    const handlePauseSpeech = () => {
      speechSynthesis.pause();
    };
  
    const handleResumeSpeech = () => {
      speechSynthesis.resume();
    };
  
    const handleStopSpeech = () => {
      speechSynthesis.cancel();
    };

  return (
    <section className='mainp'>
      <div className='search'>
        <form className='searcher' onSubmit={handleSubmit}>
            <input type='url' placeholder='Enter a URL' value={article.url} onChange={(e) => setArticle({...article, url: e.target.value})}>
            </input>
            <button type='submit'>Submit</button>
        </form>
        <div className='history'>
          {prevArticles.map((item, index) => {
            <div key={index} onClick={() => {setArticle(item)}}>
              <p>{item.url}</p>
            </div>
          })}
        </div>
      </div>
      <div className='results'>
        {isFetching ? (
          <p>Loading</p>
        ) : error ? (
          <p>Not able to fetch</p>
        ): article.summary && (
          <div className='sum'>
            <h2>Article summary</h2>
            <div className='sumbox'>
              <p>{article.summary}</p>
            </div>
            <div className="speech-controls">
              <div className="voice-selection">
                <label htmlFor="voice">Select Voice:</label>
                <select id="voice" value={selectedVoice} onChange={handleVoiceChange}>
                  <option value="">Default</option>
                  {speechSynthesis.getVoices().map((voice, index) => (
                    <option key={index} value={voice.name}>
                      {voice.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="speed-selection">
                <label htmlFor="speed">Select Speed:</label>
                <select id="speed" value={selectedSpeed} onChange={handleSpeedChange}>
                  <option value="0.5">0.5x</option>
                  <option value="1">1x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
              </div>
              <div className="speech-buttons">
                <button onClick={handleSpeech}>Play</button>
                <button onClick={handlePauseSpeech}>Pause</button>
                <button onClick={handleResumeSpeech}>Resume</button>
                <button onClick={handleStopSpeech}>Stop</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Mainpart
