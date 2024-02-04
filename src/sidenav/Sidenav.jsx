import React, { useState } from 'react';
import style from './Sidenav.module.css';
import { Link } from 'react-router-dom';

function Sidenav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [buttonIcon, setButtonIcon] = useState(`${process.env.PUBLIC_URL}/img/menu1.svg`);
    const sidebarWidth = isSidebarOpen ? '18rem' : '0px'; // Sidebar 너비 동적 조정

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to change the icon to sea2.svg on hover
    const handleMouseEnter = () => {
        setButtonIcon(`${process.env.PUBLIC_URL}/img/menu2.svg`);
    };

    // Function to change the icon back to sea1.svg when not hovered
    const handleMouseLeave = () => {
        setButtonIcon(`${process.env.PUBLIC_URL}/img/menu1.svg`);
    };

    return (
        <div className={style.container}>
            <button className={style.toggleButton} onClick={toggleSidebar}
                style={{ right: `calc(${sidebarWidth} + 1px)` }}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img src={buttonIcon} alt="Menu Icon" className={style.sea1} />
            </button>
            <div className={style.sidebar} style={{ width: sidebarWidth }}>
                <ul className={style.sidebarList}> {/* Sidebar가 닫혔을 때 내부 내용 숨김 */}
                    <li className={style.sidebarItem}>
                        <Link to="/" className={style.navLink}>
                            <span className={style.itemIcon}>
                                <i className='bx bxs-home'></i>
                            </span>
                            <span className={style.itemTxt}>
                                메인페이지
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/" className={style.navLink}>
                            <span className={style.itemIcon}>
                                <i className='bx bxs-info-circle'></i>
                            </span>
                            <span className={style.itemTxt}>
                                해양쓰레기 지도
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/" className={style.navLink}>
                            <span className={style.itemIcon}>
                                <i className='bx bxs-info-circle'></i>
                            </span>
                            <span className={style.itemTxt}>
                                수거계약신청
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/boardlist" className={style.navLink}>
                            <span className={style.itemIcon}>
                                <i className='bx bx-task'></i>
                            </span>
                            <span className={style.itemTxt}>
                                Board
                            </span>
                        </Link>
                    </li>
                    <li className={`${style.sidebarItem} ${style.sidebarContact}`}>
                        <Link to="/" className={style.navLink}>
                            <span className={style.itemIcon}>
                                <i className='bx bxs-contact'></i>
                            </span>
                            <span className={style.itemTxt}>
                                사용방법
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/signin" className={style.navLink}>
                            <span className={style.itemIcon}>
                                <i className='bx bxs-login'></i>
                            </span>
                            <span className={style.itemTxt}>
                                로그인
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/signupver" className={style.navLink}>
                            <span className={style.itemIcon}>
                                <i className='bx bxs-signin'></i>
                            </span>
                            <span className={style.itemTxt}>
                                회원가입
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidenav;

