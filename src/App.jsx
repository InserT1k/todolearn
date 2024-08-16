import React, { useState } from 'react';
import EmojiVote from './EmojiVote';
import Results from './Results';
import './App.css';

function App() {
  const [votes, setVotes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleVotes = (newVotes) => {
    setVotes(newVotes);
  };

  const clearVotes = () => {
    localStorage.removeItem('emojiVotes');
    setShowResults(false);
    window.location.reload();
  };

  return (
    <div className="app">
      <h1>Голосування за найкращий смайлик</h1>
      <EmojiVote onVote={handleVotes} />
      <button className="show-results-button" onClick={() => setShowResults(true)}>
        Show Results
      </button>
      {showResults && <Results votes={votes} />}
      <button className="clear-results-button" onClick={clearVotes}>
        Clear Results
      </button>
    </div>
  );
}

export default App;
