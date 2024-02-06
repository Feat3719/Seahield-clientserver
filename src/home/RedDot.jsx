import React, { useEffect } from 'react';
import style from './RedDot.module.css'

const RedDot = ({ x, y, w, h }) => {
  useEffect(() => {
    const redDotElement = document.getElementById('redDot');
    redDotElement.style.left = `${x}vw`;
    redDotElement.style.top = `${y}vh`;
    redDotElement.style.width = `1.5vh`;
    redDotElement.style.height = `1.5vh`
  }, [x, y]);

  return (
    <div id="redDot" className={style.RedDot}></div>
  );
};

export default RedDot;