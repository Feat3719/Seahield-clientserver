import React, { useRef, useEffect } from 'react';
import style from './Sidenav.module.css';
import { Link } from 'react-router-dom';


function Sidenav() {

    return (
        <div className={style.homepage_nav}>
            <label>
                <input type='checkbox' />
                <span className={style.menu}>
                    <span className={style.sidelist}></span>
                </span>
                <ul>
                    <li>
                        <Link className={style.navbarMenu} to={'/'}>
                            지도 볼까?
                        </Link>
                    </li>
                    <li>
                        <Link className={style.navbarMenu} to={'/'}>
                            알람 볼까?
                        </Link>
                    </li>
                    <li>
                        <Link className={style.navbarMenu} to={'/'}>
                            정보 볼까?
                        </Link>
                    </li>
                </ul>
            </label>
            <h1>메인페이지</h1>
        </div>
    );
}

export default Sidenav;