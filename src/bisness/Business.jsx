import React, { useState } from 'react';
import style from './Business.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Business({ setCompanyRegistrationNum, setIsCompanyRegistrationNumVerified }) {
    const [displayValue, setDisplayValue] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');

    const formatBusinessNumber = (value) => {
        const num = value.replace(/[^\d]/g, '');
        setBusinessNumber(num);

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
        setDisplayValue(formattedNumber);
    };

    const checkBusinessNumberDuplication = async () => {
        try {
            const response = await axios.post('/api/auth/validate-crnumber', {
                crn: businessNumber // 'crn' 필드에 사업자번호를 할당
            });

            if (response.data.isDuplicate) {
                setDisplayValue(''); // 입력 필드 초기화
                setBusinessNumber('');
                Swal.fire('실패', '이미 가입한 사업자번호입니다.', 'error');
                return false; // 중복인 경우 false 반환
            }
            return true; // 중복이 아닌 경우 true 반환
        } catch (error) {
            // console.error('사업자번호 중복 검사 에러:', error);
            Swal.fire('오류', '사업자번호 중복 검사 중 오류가 발생했습니다.', 'error');
            return false; // 오류 발생 시 false 반환
        }
    };

    const handleBusinessNumberVerification = async () => {
        const isUnique = await checkBusinessNumberDuplication();
        if (!isUnique) return; // 중복이거나 오류인 경우 검증 절차 중단

        try {
            const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_API_KEY}`;
            const response = await axios.post(url, {
                b_no: [businessNumber],
            });

            const businessStatusCode = response.data.data[0].b_stt_cd;
            if (businessStatusCode === "01") {
                setIsCompanyRegistrationNumVerified(true);
                setCompanyRegistrationNum(businessNumber);
                // console.log("사업자 번호 인증 완료:", businessNumber); // 로그로 확인
                Swal.fire('성공', '사업자번호 인증을 성공하였습니다.', 'success');
            } else {
                setIsCompanyRegistrationNumVerified(false);
                Swal.fire('실패', '사업자번호 인증이 실패하였습니다.', 'error');
            }
        } catch (error) {
            // console.error('사업자번호 인증 에러:', error);
            Swal.fire('오류', '사업자번호 인증 중 오류가 발생했습니다.', 'error');
        }
    };

    return (
        <div className={style.businesswrapper}>
            <input
                type="text"
                maxLength="12"
                placeholder="사업자번호"
                value={displayValue}
                onChange={handleBusinessNumberChange}
                className={style.signup_input}
            />
            <div onClick={handleBusinessNumberVerification} className={style.check_id_button}>사업자인증</div>
        </div>
    );
}

export default Business;
