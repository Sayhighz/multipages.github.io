import React, { useState, useEffect } from 'react';

export const Timer = (props) => {
  const [seconds, setSeconds] = useState(props.value || 0);
  const [running, setRunning] = useState(false);

  const runClick = () => {
    if (!running) {
      setRunning(true);
    } else {
      setRunning(false);
    }
  };

  const resetClick = () => {
    setSeconds(0);
    setRunning(false);
  };

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000); 
    } else if (!running && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  const secondsToString = (sec) => {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = MINUTE_SECONDS * 60;
    const DAY_SECONDS = HOUR_SECONDS * 24;

    const days = Math.floor(sec / DAY_SECONDS);
    const hours = Math.floor((sec % DAY_SECONDS) / HOUR_SECONDS);
    const minutes = Math.floor((sec % HOUR_SECONDS) / MINUTE_SECONDS);
    const remainingSeconds = sec % MINUTE_SECONDS;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="card bg-white">
      <h1 className="card-title">{props.name || 'TIMER'}</h1>
      <h2>{secondsToString(seconds)}</h2>
      <div className="card-body">
        <button className="btn btn-success" onClick={runClick}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button className="btn btn-danger" onClick={resetClick}>Reset</button>
      </div>
    </div>
  );
};
