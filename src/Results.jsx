import React, { Component } from 'react';

class Results extends Component {
  render() {
    const { votes } = this.props;
    const winner = votes.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );

    return (
      <div>
        <h3>Результати голосування:</h3>
        <p>Переможець: {winner.emoji}</p>
        <p>Кількість голосів: {winner.votes}</p>
      </div>
    );
  }
}

export default Results;
