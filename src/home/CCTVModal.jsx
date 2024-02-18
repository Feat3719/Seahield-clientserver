import React, { useState } from 'react';
import style from './CCTV.Module.css';

function CCTVModal(props) {
    const { icon, videoUrl, tableBody } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [smallScreenVideo, setSmallScreenVideo] = useState('');
    const [showTable, setShowTable] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        if(videoUrl !==null){
            setSelectedVideo(videoUrl);
        }
        setSmallScreenVideo('');
        setShowTable(false); // 작은 화면에 테이블을 보여주지 않습니다.
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSmallScreenVideo(selectedVideo); // 마지막으로 선택된 비디오를 작은 화면 비디오로 설정합니다.
    if(videoUrl){
        setSelectedVideo('');
    }
        setShowTable(true); // 작은 화면에 테이블을 보여줍니다.
    };

    const handleModalOutsideClick = () => {
        if (isModalOpen) {
            handleCloseModal();
        }
    };

    return (
        <div className={style.container} onClick={handleModalOutsideClick}>
            {icon === "cctv-icon-1.png" && (
                <img 
                    style={{position: 'absolute',width: '2.5vw', height:' 5vh', right: '5vw',
                            top: '40vh'}} 
                    src={process.env.PUBLIC_URL + '/images/cctv-icon-1.png'} 
                    alt="CCTV 1" 
                    onClick={handleOpenModal} 
                    className={style.icon} 
                />
            )}
            {icon === "cctv-icon-2.png" && (
                <img 
                    style={{position: 'absolute',width: '2.5vw', height:' 5vh',left:'10vw',top: '50vh'}} 
                    src={process.env.PUBLIC_URL + '/images/cctv-icon-2.png'} 
                    alt="CCTV 2" 
                    onClick={handleOpenModal} 
                    className={style.icon} 
                />
            )}

            {isModalOpen && (
                <div className={style.modal}>
                    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                        <VideoPlayer
                            videoUrl={selectedVideo}
                            handleCloseModal={handleCloseModal}
                            showTable={showTable}
                            tableBody={tableBody}
                        />
                    </div>
                </div>
            )}

            {smallScreenVideo && (
                <div className={style.smallScreen} style={{ position: 'fixed', top: '3vh', left: '5vw' }}>
                    <video 
                        controls 
                        autoPlay 
                        muted 
                        className={style.smallScreenVideo} 
                        style={{ width: '25vw' }}
                    >
                        <source src={smallScreenVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {showTable && (
                <div className={style.smallScreenTable} style={{ position: 'fixed',fontSize:'2vh', bottom: '3vh', left: '5vw',width:'24.6vw',height:'1vh',top:'50vh' }}>
                    {tableBody}
                </div>
            )}
                    </div>
                );
            }

function VideoPlayer({ videoUrl, handleCloseModal, showTable, tableBody }) {
    return (
        <div> 
            <video 
                controls 
                autoPlay 
                muted 
                className={style.fullScreenVideo} 
                style={{ position: 'fixed', top: 0, left: '30vw', width: '40vw' }}
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <button onClick={handleCloseModal} style={{position:'relative',top:'40vh',right:'0vw'}}>Close</button>

            {showTable && tableBody} {/* 작은 화면에 테이블을 보여줍니다. */}
        </div>
    );
}

export default CCTVModal;