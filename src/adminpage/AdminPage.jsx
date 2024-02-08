import React, { useState } from 'react';
import Wrapper from '../pagechange/Wrapper';
import Sidenav from '../sidenav/Sidenav';
import { motion } from 'framer-motion';
import style from './AdminPage.module.css';

function AdminPage() {
    // 현재 선택된 탭을 추적하는 상태
    const [selectedTab, setSelectedTab] = useState('members');

    // 탭 클릭 핸들러 함수
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <Wrapper>
            <div className={style.admin}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>

                <motion.div
                    className={style.admin_area}
                    initial={{ y: -250, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className={style.admin_title}>
                        관리자 페이지
                    </h1>

                    <div className={style.admin_contents}>

                        <div className={style.tabs}>
                            <div onClick={() => handleTabClick('members')} className={`${style.tab} ${selectedTab === 'members' ? style.activeTab : ''}`}>회원</div>
                            <div onClick={() => handleTabClick('applications')} className={`${style.tab} ${selectedTab === 'applications' ? style.activeTab : ''}`}>계약신청</div>
                            <div onClick={() => handleTabClick('posts')} className={`${style.tab} ${selectedTab === 'posts' ? style.activeTab : ''}`}>게시글</div>
                            <div onClick={() => handleTabClick('cameras')} className={`${style.tab} ${selectedTab === 'cameras' ? style.activeTab : ''}`}>카메라</div>
                        </div>

                        <div className={style.tabContent}>

                            {selectedTab === 'members' &&
                                <div className={style.admin_user}>
                                    <p className={style.admin_user_title}>회원 목록</p>
                                </div>
                            }

                            {selectedTab === 'applications' &&
                                <p>계약신청</p>
                            }

                            {selectedTab === 'posts' &&
                                <p>게시글</p>
                            }

                            {selectedTab === 'cameras' &&
                                <p>카메라</p>
                            }

                        </div>

                    </div>

                </motion.div>
            </div>
        </Wrapper>
    );
}

export default AdminPage;
