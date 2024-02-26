import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import
import style from './IdFind.module.css';
import Sidenav from '../sidenav/Sidenav';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function IdFind() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('idFind');
    const [email, setEmail] = useState(''); // 이메일 상태 변화
    const [idFoundMessage, setIdFoundMessage] = useState(''); // 아이디 찾기 응답 메시지
    const [userId, setUserId] = useState(''); // 아이디 상태
    const [passwordChangeMessage, setPasswordChangeMessage] = useState(''); // 비밀번호 변경 응답 메시지
    const [isFindingId, setIsFindingId] = useState(false); // 아이디 찾기 요청 진행 중인지 여부
    const [isPasswordChanging, setIsPasswordChanging] = useState(false); // 비밀번호 변경 요청 진행 중인지 여부 추가

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tab = searchParams.get('type');
        if (tab === 'idFind' || tab === 'passwordChange') {
            setActiveTab(tab);
        }
    }, [location]);

    const handleFindId = async () => {
        setIsFindingId(true); // 요청 시작
        try {
            await axios.get('/api/email/userid', {
                params: {
                    userEmail: email
                }
            });
            setIdFoundMessage('이메일로 아이디를 전송하였습니다.' || 'ID Found Done');

            // Swal alert 창 설정
            Swal.fire({
                title: '이메일 전송 완료',
                text: '아이디를 이메일로 전송했습니다.',
                icon: 'success',
                confirmButtonText: '로그인하러 가기',
                confirmButtonColor: '#8ce650b2',
            }).then((result) => {
                // '로그인하러 가기' 버튼 클릭 시 /signin으로 리다이렉트
                if (result.isConfirmed) {
                    window.location.href = '/signin';
                }
            });

        } catch (error) {
            // console.error('아이디 찾기 실패:', error);
            setIdFoundMessage(error.response?.data?.message || '아이디 찾기를 실패했습니다.');
        } finally {
            setIsFindingId(false); // 요청 완료
        }
    };

    const handlePasswordChange = async () => {
        setIsPasswordChanging(true); // 요청 시작
        try {
            await axios.get('/api/email/userpwd', {
                params: {
                    userId: userId,
                    userEmail: email
                }
            });
            // 성공 메시지 설정
            setPasswordChangeMessage('임시비밀번호를 발급하였습니다.');

            // Swal alert 창 설정
            Swal.fire({
                title: '임시 비밀번호 발급 완료',
                text: '비밀번호를 이메일로 전송했습니다.',
                icon: 'success',
                confirmButtonText: '로그인하러 가기',
                confirmButtonColor: '#8ce650b2',
            }).then((result) => {
                // '로그인하러 가기' 버튼 클릭 시 /signin으로 리다이렉트
                if (result.isConfirmed) {
                    window.location.href = '/signin';
                }
            });

        } catch (error) {
            // console.error('비밀번호 변경 실패:', error);
            // 서버에서 반환하는 오류 메시지를 표시
            setPasswordChangeMessage(error.response?.data?.message || '비밀번호 변경을 실패했습니다.');

            // 실패한 경우 Swal alert 창 설정
            Swal.fire({
                title: '비밀번호 변경 실패',
                text: error.response?.data?.message || '비밀번호 변경을 실패했습니다.',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#d33',
            });
        } finally {
            setIsPasswordChanging(false); // 요청 완료
        }
    };

    // 아이디 찾기 입력 필드에서 엔터 키 이벤트를 처리하는 함수
    const handleFindIdKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleFindId();
        }
    };

    // 비밀번호 변경 입력 필드에서 엔터 키 이벤트를 처리하는 함수
    const handlePasswordChangeKeyDown = (event) => {
        if (event.key === 'Enter') {
            handlePasswordChange();
        }
    };

    return (
        <div className={style.idfind}>
            <div className={style.login_nav}>
                <Sidenav />
            </div>

            <motion.div
                className={style.idfind_area}
                initial={{ y: -250, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* 탭 UI */}
                <div className={style.tabs}>
                    {/* 탭 내용 */}
                    <div
                        className={`${style.tab1} ${activeTab === 'idFind' ? style.active : ''}`}
                        onClick={() => setActiveTab('idFind')}
                    >
                        아이디 찾기
                    </div>
                    <div
                        className={`${style.tab2} ${activeTab === 'passwordChange' ? style.active : ''}`}
                        onClick={() => setActiveTab('passwordChange')}
                    >
                        비밀번호 찾기
                    </div>
                </div>
                <h1 className={style.signup_title}>
                    {activeTab === 'idFind' ? '아이디 찾기' : '임시비밀번호 발급'}
                </h1>

                <div className={style.tab_content}>
                    {activeTab === 'idFind' ? (
                        <div className={style.idfind_inputarea}> {/* 아이디 찾기 내용 */}
                            <div className={style.idfind_inputarea1}>
                                <input
                                    type="text"
                                    placeholder="가입한 이메일을 입력하세요"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleFindIdKeyDown} // 엔터 키 처리 추가
                                    className={style.email_input}
                                />
                                <button onClick={handleFindId} className={style.find_id_button}>아이디 찾기</button>
                            </div>
                            {isFindingId ? (
                                <div className={style.id_finding_message}>아이디를 찾는 중입니다.</div>
                            ) : (
                                idFoundMessage && <div className={style.id_found_message}>{idFoundMessage}</div>
                            )}
                        </div>
                    ) : (
                        <div className={style.password_change_inputarea}> {/* 비밀번호 변경 내용 */}
                            <div className={style.password_change_inputarea1}>
                                <div className={style.password_change_inputarea2}>
                                    <p className={style.password_id}>아이디</p>
                                    <input
                                        type="text"
                                        placeholder="아이디를 입력하세요"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        onKeyDown={handlePasswordChangeKeyDown} // 엔터 키 처리 추가
                                        className={style.user_input2}
                                    />
                                </div>
                                <div className={style.password_change_inputarea3}>
                                    <p className={style.password_id}>이메일</p>
                                    <input
                                        type="email"
                                        placeholder="가입한 이메일을 입력하세요"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={handlePasswordChangeKeyDown} // 엔터 키 처리 추가
                                        className={style.email_input2}
                                    />
                                </div>
                                <button onClick={handlePasswordChange} className={style.change_password_button}>비밀번호 발급</button>
                            </div>
                            {isPasswordChanging ? (
                                <div className={style.password_changing_message}>임시비밀번호를 발급하는 중입니다.</div>
                            ) : (
                                passwordChangeMessage && <div className={style.password_change_message}>{passwordChangeMessage}</div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default IdFind;
