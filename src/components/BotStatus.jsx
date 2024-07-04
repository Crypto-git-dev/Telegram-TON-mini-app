import React from 'react';
import './BotStatus.css';

function BotStatus() {
  return (
    <div className="bot-status">
      <div className="bot-amount">$ 34 000</div>
      <div className="bot-image"></div>
      <div className="bot-metrics">
        <div className="metric">
          <div className="metric-title">Фарминг</div>
          <div className="metric-bar">
            <div className="metric-bar-fill" style={{width: '67%'}}></div>
          </div>
          <div className="metric-remaining">Осталось 2|3</div>
        </div>
        <div className="metric">
          <div className="metric-title">Энергия</div>
          <div className="metric-bar">
            <div className="metric-bar-fill" style={{width: '90%'}}></div>
          </div>
          <div className="metric-remaining">Осталось 9|10</div>
        </div>
      </div>
    </div>
  );
}

export default BotStatus;