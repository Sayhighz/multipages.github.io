import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Basketball from '../../assets/images/Basketball.png';
import Football from '../../assets/images/Football.png';
import Volleyball from '../../assets/images/Volleyball.png';
import Human from '../../assets/images/Human.jpeg';
import Cartoon from '../../assets/images/Cartoon.png';
import Logo from '../../assets/images/Logo.png';
import Field from '../../assets/images/field.jpg';

const Animation = () => {
  // States
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [running, setRunning] = useState(false);
  const [ballImage, setBallImage] = useState('');
  const ballSize = 100;
  const fieldWidth = 1000;
  const fieldHeight = 700;
  const vx = 5;
  const vy = 5;
  const rotationSpeed = 5;
  
  const maxLeft = fieldWidth - ballSize - 2;
  const maxTop = fieldHeight - ballSize - 2;

  const toggleRun = () => {
    setRunning(!running);
  };

  // Update the function to use the /asset/images folder
  const changeBall = (type) => {
    setBallImage(type ? type : '');
  };

  const calculate = () => {
    setX((prevX) => (goRight ? prevX + vx : prevX - vx));
    setY((prevY) => (goDown ? prevY + vy : prevY - vy));

    if (x >= maxLeft) setGoRight(false);
    if (x <= 0) setGoRight(true);
    if (y >= maxTop) setGoDown(false);
    if (y <= 0) setGoDown(true);

    setRotation((prevRotation) => (prevRotation + rotationSpeed) % 360);
  };

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => calculate(), 25);
      return () => clearInterval(interval);
    }
  }, [running, x, y]);

  return (
    <div id="container" style={containerStyle}>
      <div id="field" style={fieldStyle(fieldWidth, fieldHeight)}>
        <div id="ball" style={ballStyle(x, y, rotation, ballSize, ballImage)}></div>
      </div>
      <div id="control">
        <button type="button" className={`btn ${running ? 'btn-danger' : 'btn-success'}`} onClick={toggleRun}>
          <span className={`bi bi-${running ? 'pause' : 'play'}`}>&nbsp;{running ? 'PAUSE' : 'RUN'}</span>
        </button>
        <button className="btn btn-outline-primary" onClick={() => changeBall('')}>NONE</button>
        <button className="btn btn-outline-primary" onClick={() => changeBall(Basketball)}>BASKETBALL</button>
        <button className="btn btn-outline-primary" onClick={() => changeBall(Football)}>FOOTBALL</button>
        <button className="btn btn-outline-primary" onClick={() => changeBall(Volleyball)}>VOLLEYBALL</button>
        <button className="btn btn-outline-primary" onClick={() => changeBall(Human)}>HUMAN</button>
        <button className="btn btn-outline-primary" onClick={() => changeBall(Cartoon)}>CARTOON</button>
        <button className="btn btn-outline-primary" onClick={() => changeBall(Logo)}>LOGO</button>
      </div>
    </div>
  );
};

// Inline Styles
const containerStyle = {
  border: '1px solid black',
  width: 'fit-content',
  margin: 'auto',
  borderRadius: '20px',
  padding: '20px',
};

const fieldStyle = (width, height) => ({
  width: `${width}px`,
  height: `${height}px`,
  border: '1px solid black',
  margin: 'auto',
  marginBottom: '20px',
  backgroundImage: `url(${Field})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  borderRadius: '10px',
});

const ballStyle = (x, y, rotation, size, image) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '50%',
  border: '1px solid black',
  backgroundColor: 'rgb(171, 254, 254)',
  position: 'relative',
  left: `${x}px`,
  top: `${y}px`,
  transform: `rotate(${rotation}deg)`,
  backgroundImage: `url(${image})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
});

export default Animation;
