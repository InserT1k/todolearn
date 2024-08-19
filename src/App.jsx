import React, { Component } from 'react';
import EmojiVote from './EmojiVote';
import Results from './Results';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: [],
      showResults: false,
    };
  }

  handleVotes = (newVotes) => {
    this.setState({ votes: newVotes });
  };

  setShowResults = (show) => {
    this.setState({ showResults: show });
  };

  clearVotes = () => {
    localStorage.removeItem('emojiVotes');
    this.setState({ showResults: false });
    window.location.reload();
  };

  render() {
    const { votes, showResults } = this.state;

    return (
      <div className="app">
        <h1>Голосування за найкращий смайлик</h1>
        <EmojiVote onVote={this.handleVotes} />
        <button className="show-results-button" onClick={() => this.setShowResults(true)}>
          Show Results
        </button>
        {showResults && <Results votes={votes} />}
        <button className="clear-results-button" onClick={this.clearVotes}>
          Clear Results
        </button>
      </div>
    );
  }
}

export default App;
