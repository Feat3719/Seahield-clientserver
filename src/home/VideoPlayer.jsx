import React from 'react';

// VideoPlayer 컴포넌트
const VideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <video controls autoPlay muted style={{ width: '100%' }}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;