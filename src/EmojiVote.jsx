import React, { useState, useEffect } from 'react';
import './EmojiVote.css';

const emojis = [
  { id: 1, emoji: '😃', votes: 0 },
  { id: 2, emoji: '😊', votes: 0 },
  { id: 3, emoji: '😎', votes: 0 },
  { id: 4, emoji: '😍', votes: 0 },
  { id: 5, emoji: '🥰', votes: 0 },
];

const EmojiVote = ({ onVote }) => {
  const [votes, setVotes] = useState(() => {
    const storedVotes = localStorage.getItem('emojiVotes');
    return storedVotes ? JSON.parse(storedVotes) : emojis;
  });

  useEffect(() => {
    localStorage.setItem('emojiVotes', JSON.stringify(votes));
  }, [votes]);

  const handleVote = (id) => {
    const updatedVotes = votes.map((emoji) =>
      emoji.id === id ? { ...emoji, votes: emoji.votes + 1 } : emoji
    );
    setVotes(updatedVotes);
    onVote(updatedVotes);
  };

  return (
    <div className="emoji-vote-container">
      {votes.map(({ id, emoji, votes }) => (
        <div key={id} onClick={() => handleVote(id)}>
          <span>{emoji}</span> <span>{votes}</span>
        </div>
      ))}
    </div>
  );
};

export default EmojiVote;
