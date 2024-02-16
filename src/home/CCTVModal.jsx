    import React, { useState } from 'react';
    import style from './CCTV.Module.css'; // 스타일 모듈 경로를 확인하세요

    function CCTVModal() {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedVideo, setSelectedVideo] = useState('');
        const [smallScreenVideo, setSmallScreenVideo] = useState('');
    
        // 비디오 소스를 결정하는 함수
        const getVideoSource = (imageName) => {
            switch(imageName) {
            case "cctv-icon-1.png":
                return (
                        
                    process.env.PUBLIC_URL + "/videos/sea.mp4");
            case "cctv-icon-2.png":
                return process.env.PUBLIC_URL + "/videos/river.mp4";
            // 다른 CCTV 아이콘에 대한 비디오 소스 추가 가능
            default:
                return ''; // 기본값 또는 다른 비디오 소스
            }
        };
    
        // 모달 오픈 함수: 선택된 비디오를 큰 화면으로 보여주고, smallScreenVideo 상태를 업데이트
        const handleOpenModal = (videoName) => {
            setIsModalOpen(true);
            const videoSource = getVideoSource(videoName);
            setSelectedVideo(videoSource);
        };
    
        // 모달 클로즈 함수: 모달을 닫고 선택된 비디오를 작은 화면으로 전환
        const handleCloseModal = () => {
            setIsModalOpen(false);
            setSmallScreenVideo(selectedVideo);
        };
    
        // 모달 외부 클릭 시 모달 닫기
        const handleModalOutsideClick = () => {
            if (isModalOpen) {
                handleCloseModal();
            }
        };
    return (
        <div className={style.container} onClick={handleModalOutsideClick}>
            <img 
    style={{width:"10vw"}} 
    src={process.env.PUBLIC_URL + '/images/cctv-icon-1.png'} 
    alt="CCTV 1" 
    onClick={() => handleOpenModal('cctv-icon-1.png')} 
    className={style.icon} 
/>

            {isModalOpen && (
            <div className={style.modal}>
                <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                <video controls autoPlay muted className={style.fullScreenVideo}>
                    <source src={selectedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button onClick={handleCloseModal}>Close</button>
                </div>
            </div>
            )}

            {/* 작은 화면 비디오 플레이어 */}
            {smallScreenVideo && (
            <div className={style.smallScreen}>
                <video controls autoPlay muted className={style.smallScreenVideo}
                style={{ position: 'fixed', top: 0, left: 0, width: '25%' }}>
                <source src={smallScreenVideo} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
            )}
        </div>
    );
}

    export default CCTVModal;
