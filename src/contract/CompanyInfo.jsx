import { useState } from 'react';
import DaumPost from '../daumpost/DaumPost';
import Wrapper from '../pagechange/Wrapper';
import Sidenav from '../sidenav/Sidenav';
import style from './CompanyInfo.module.css';
import { motion } from 'framer-motion'



function CompanyInfo() {
    const [address, setAddress] = useState('');
    return (
        <Wrapper>
            <div className={style.companyinfo}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>

                <motion.div
                    className={style.companyinfo_area}
                    initial={{ y: -250, opacity: 0 }} // 시작 위치와 투명도
                    animate={{ y: 0, opacity: 1 }} // 끝 위치와 투명도
                    transition={{ duration: 0.6, delay: 0.2 }} // 애니메이션 지속 시간과 지연 시간
                >

                    <h1 className={style.companyinfo_title}>
                        회사정보 입력
                    </h1>


                    <div className={style.form_right_row}>
                        <div className={style.form_date}>
                            <label className={style.form_label}>상호 또는 법인명칭</label>
                            <input className={style.form_input} placeholder="지학IT" />
                        </div>
                        <div className={style.form_date}>
                            <label className={style.form_label}>법인(사업자) 등록번호</label>
                            <input className={style.form_input} placeholder="000-00-000000" />
                        </div>
                        <div className={style.form_date}>
                            <label className={style.form_label}>대표자</label>
                            <input className={style.form_input} placeholder="이지은" />
                        </div>
                        <div className={style.form_date}>
                            <label className={style.form_label}>주소</label>
                            <div className={style.form_address_area}>
                                <div className={style.form_address}>
                                    <input
                                        className={style.address_input}
                                        placeholder="서울시 강남구 강남빌딩 101호"
                                        value={address} // 주소 상태를 입력창에 연결
                                        readOnly // 주소는 직접 입력하지 않고 DaumPost를 통해 받으므로 readOnly로 설정
                                    />
                                    <DaumPost setAddress={setAddress} />
                                </div>
                                <input className={style.form_input2} placeholder="상세주소" />
                            </div>
                        </div>
                        <div className={style.form_date}>
                            <label className={style.form_label}>전화번호</label>
                            <input className={style.form_input} placeholder="01000000000" />
                        </div>
                        <div className={style.form_date}>
                            <label className={style.form_label}>주민등록번호</label>
                            <input className={style.form_input} placeholder="123456-1234567" />

                        </div>

                        <div className={style.signature_display}>
                            <div className={style.contract_btn} onClick={() => alert("hi")}>
                                등록하기
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Wrapper>
    )
}

export default CompanyInfo;