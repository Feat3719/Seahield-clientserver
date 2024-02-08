import React from 'react';
import { motion } from 'framer-motion';
import { pageEffect } from './animation';

// Wrapper.jsx
const wrapperStyle = {
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden', // 넘치는 부분은 숨김
    top: 0,
    left: 0,
    transform: 'translateZ(0)'
};

const Wrapper = ({ children, ...rest }) => {
    return (
        <motion.div
            style={wrapperStyle}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageEffect}
            transition={{ duration: 0.7 }}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default Wrapper;