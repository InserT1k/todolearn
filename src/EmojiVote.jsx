import React, { Component } from 'react';
import './EmojiVote.css';

const emojis = [
  { id: 1, emoji: '😃', votes: 0 },
  { id: 2, emoji: '😊', votes: 0 },
  { id: 3, emoji: '😎', votes: 0 },
  { id: 4, emoji: '😍', votes: 0 },
  { id: 5, emoji: '🥰', votes: 0 },
];

class EmojiVote extends Component {
  constructor(props) {
    super(props);
    const storedVotes = localStorage.getItem('emojiVotes');
    this.state = {
      votes: storedVotes ? JSON.parse(storedVotes) : emojis,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.votes !== this.state.votes) {
      localStorage.setItem('emojiVotes', JSON.stringify(this.state.votes));
    }
  }

  handleVote = (id) => {
    const updatedVotes = this.state.votes.map((emoji) =>
      emoji.id === id ? { ...emoji, votes: emoji.votes + 1 } : emoji
    );
    this.setState({ votes: updatedVotes });
    this.props.onVote(updatedVotes);
  };

  render() {
    return (
      <div className="emoji-vote-container">
        {this.state.votes.map(({ id, emoji, votes }) => (
          <div key={id} onClick={() => this.handleVote(id)}>
            <span>{emoji}</span> <span>{votes}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default EmojiVote;
