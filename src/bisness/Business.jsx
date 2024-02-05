//사업자번호 인증
import React, { useState, useCallback } from 'react'; // useCallback import
import style from './Business.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Business({ setCompanyRegistrationNum, setIsCompanyRegistrationNumVerified }) {
    const [displayValue, setDisplayValue] = useState(''); // 사용자에게 보여주는 값 (포맷팅 적용)
    const [businessNumber, setBusinessNumber] = useState(''); // 실제 값 (숫자만)



    // 길이에 따른 포맷팅
    const formatBusinessNumber = (value) => {
        const num = value.replace(/[^\d]/g, ''); // 숫자만 추출
        setBusinessNumber(num); // 숫자만 저장

        // 길이에 따른 포맷팅 적용하여 반환
        if (num.length <= 3) {
            return num;
        } else if (num.length <= 5) {
            return `${num.slice(0, 3)}-${num.slice(3)}`;
        } else {
            return `${num.slice(0, 3)}-${num.slice(3, 5)}-${num.slice(5, 10)}`;
        }
    };

    const handleBusinessNumberChange = (e) => {
        const formattedNumber = formatBusinessNumber(e.target.value);
        setDisplayValue(formattedNumber); // 포맷팅 적용 값 저장
    };

    const handleBusinessNumberVerification = async () => {
        try {
            const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_API_KEY}`;
            const response = await axios.post(url, {
                b_no: [businessNumber],
            });

            // 사업자 상태 코드 (01: 계속사업자, 02: 휴업자, 03: 폐업자)
            const businessStatusCode = response.data.data[0].b_stt_cd;

            if (businessStatusCode === "01") {
                setIsCompanyRegistrationNumVerified(true); // 상태 끌어올리기
                setCompanyRegistrationNum(businessNumber); // 상태 끌어올리기
                Swal.fire('성공', '사업자번호 인증을 성공하였습니다.', 'success');
            } else {
                setIsCompanyRegistrationNumVerified(false); // 상태 끌어올리기
                Swal.fire('실패', '사업자번호 인증이 실패하였습니다.', 'error');
            }
        } catch (error) {
            console.error('사업자번호 인증 에러:', error);
            Swal.fire('오류', '사업자번호 인증 중 오류가 발생했습니다.', 'error');
        }
    };

    return (
        <div className={style.businesswrapper}>
            <input
                type="text"
                maxLength="12"
                placeholder="사업자번호"
                value={displayValue} // 포맷팅 적용 값 사용
                onChange={handleBusinessNumberChange}
                className={style.signup_input}
            />
            <button type="button" onClick={handleBusinessNumberVerification} className={style.check_id_button}>사업자인증</button>
        </div>
    );
}

export default Business;
