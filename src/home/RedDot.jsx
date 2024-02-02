import React, { useEffect } from 'react';
import style from './RedDot.module.css'

const RedDot = ({ x, y }) => {
  useEffect(() => {
    const redDotElement = document.getElementById('redDot');
    redDotElement.style.left = `${x}%`;
    redDotElement.style.top = `${y}%`;
  }, [x, y]);

  return (
    <div id="redDot" className={style.RedDot}></div>
  );
};

export default RedDot;