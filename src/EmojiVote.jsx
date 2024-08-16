import React, { useState, useEffect } from 'react';

const initialEmojis = [
  { id: 1, emoji: '😃', votes: 0 },
  { id: 2, emoji: '😊', votes: 0 },
  { id: 3, emoji: '😎', votes: 0 },
  { id: 4, emoji: '😍', votes: 0 },
  { id: 5, emoji: '🥰', votes: 0 },
];

const EmojiVote = ({ onVote }) => {
  const [emojis, setEmojis] = useState(() => {
    const storedVotes = localStorage.getItem('emojiVotes');
    return storedVotes ? JSON.parse(storedVotes) : initialEmojis;
  });

  useEffect(() => {
    localStorage.setItem('emojiVotes', JSON.stringify(emojis));
  }, [emojis]);

  const handleVote = (id) => {
    const updatedEmojis = emojis.map((emoji) =>
      emoji.id === id ? { ...emoji, votes: emoji.votes + 1 } : emoji
    );
    setEmojis(updatedEmojis);
    onVote(updatedEmojis);
  };

  return (
    <div className="emoji-vote-container">
      {emojis.map(({ id, emoji, votes }) => (
        <div key={id} onClick={() => handleVote(id)}>
          <span>{emoji}</span> <span>{votes}</span>
        </div>
      ))}
    </div>
  );
};

export default EmojiVote;
