// Loading.jsx
import React from 'react';
import Lottie from 'react-lottie';
import LoadingAnimation from '../lottie/loading.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Loading = () => {
    return (
        <div style={{
            position: 'fixed', // Covers the entire screen
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
            zIndex: 1000, // Ensure it's on top of other content
        }}>
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
        </div>
    );
}

export default Loading;