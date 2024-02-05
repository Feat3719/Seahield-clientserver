import React, { useState } from 'react';
import style from './Sidenav.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutBtn from '../reducers/LogOutBtn';

function Sidenav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [buttonIcon, setButtonIcon] = useState(`${process.env.PUBLIC_URL}/images/menu1.svg`);
    const sidebarWidth = isSidebarOpen ? '35vh' : '0px'; // Sidebar 너비 동적 조정
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // isLoggedIn 상태 가져오기

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to change the icon to sea2.svg on hover
    const handleMouseEnter = () => {
        setButtonIcon(`${process.env.PUBLIC_URL}/images/menu2.svg`);
    };

    // Function to change the icon back to sea1.svg when not hovered
    const handleMouseLeave = () => {
        setButtonIcon(`${process.env.PUBLIC_URL}/images/menu1.svg`);
    };

    return (
        <div className={style.container}>
            <button className={style.toggleButton} onClick={toggleSidebar}
                style={{ right: `calc(${sidebarWidth} + 1px)` }}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img src={buttonIcon} alt="Menu Icon" className={style.sea1} />
            </button>
            <div className={style.sidebar} style={{ width: isSidebarOpen ? '35vh' : '0px' }}>
                <ul className={style.sidebarList}> {/* Sidebar가 닫혔을 때 내부 내용 숨김 */}
                    <li className={style.sidebarItem}>
                        <Link to="/" className={style.navLink}>
                            <span className={style.itemTxt}>
                                메인페이지
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/map" className={style.navLink}>
                            <span className={style.itemTxt}>
                                해양쓰레기 지도
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/" className={style.navLink}>
                            <span className={style.itemTxt}>
                                수거계약신청
                            </span>
                        </Link>
                    </li>
                    <li className={style.sidebarItem}>
                        <Link to="/boardlist" className={style.navLink}>
                            <span className={style.itemTxt}>
                                Q@A
                            </span>
                        </Link>
                    </li>
                    <li className={`${style.sidebarItem} ${style.sidebarContact}`}>
                        <Link to="/" className={style.navLink}>
                            <span className={style.itemTxt}>
                                사용방법
                            </span>
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className={style.sidebarItem}>
                                <LogOutBtn /> {/* LogOutBtn 컴포넌트를 사용합니다 */}
                            </li>
                            <li className={style.sidebarItem}>
                                <Link to="/mypage" className={style.navLink}>
                                    <span className={style.itemTxt}>
                                        마이페이지
                                    </span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={style.sidebarItem}>
                                <Link to="/signin" className={style.navLink}>
                                    <span className={style.itemTxt}>
                                        로그인
                                    </span>
                                </Link>
                            </li>
                            <li className={style.sidebarItem}>
                                <Link to="/signupver" className={style.navLink}>
                                    <span className={style.itemTxt}>
                                        회원가입
                                    </span>
                                </Link>
                            </li>
                        </>
                    )}
                    <Link to="/map" className={style.navLink}>
                        <img src={`${process.env.PUBLIC_URL}/images/seahield_logo.png`} alt="logo" className={style.logo} />
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidenav;

