import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav/Sidenav';
import style from './Signup.module.css';
import { motion } from 'framer-motion';
import DaumPost from '../daumpost/DaumPost';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Wrapper from '../pagechange/Wrapper';
import Business from '../bisness/Business';
import Loading from '../loading/Loading';


function Signup() {
    const location = useLocation(); // location 객체를 사용합니다.
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 추가
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    // const [userType, setUserType] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 가시성 상태
    // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // 비밀번호 확인 가시성 상태
    const [isSmsSend, setIsSmsSend] = useState(false); //인증번호 발송
    const [timer, setTimer] = useState(null); // 타이머 상태 추가
    const [isLoading, setIsLoading] = useState(false); // 로딩

    // 각 입력 필드가 포커스를 잃었는지 여부를 추적하는 상태 변수 추가
    const [useridTouched, setUseridTouched] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    // const [phoneTouched, setPhoneTouched] = useState(false);
    // const [detailAddressTouched, setDetailAddressTouched] = useState(false);

    //빈칸 검증
    const [isUserIdValid, setIsUserIdValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    // URL에서 쿼리 파라미터 파싱
    const queryParams = new URLSearchParams(location.search);
    const isBusinessUser = queryParams.get('isBusinessUser') === 'true';

    //사업자번호
    const [companyRegistNum, setCompanyRegistNum] = useState('');
    const [isCompanyRegistrationNumVerified, setIsCompanyRegistrationNumVerified] = useState(false);

    // 각 입력 필드의 onBlur 핸들러
    const handleUseridBlur = () => {
        setUseridTouched(true);
    };

    const handleUsernameBlur = () => {
        setUsernameTouched(true);
    };

    // 각 입력 필드의 유효성 검증 로직
    useEffect(() => {
        setIsUserIdValid(userid.trim() !== '');
        setIsUsernameValid(username.trim() !== '');
        setIsPasswordValid(password.trim() !== '');
        setIsEmailValid(email.trim() !== '');
        setIsPhoneValid(phone.trim() !== '');
        // 상세주소는 선택적 필드일 수 있습니다. 필수인 경우 아래 로직 추가
        // setIsDetailAddressValid(detailAddress.trim() !== '');
    }, [userid, username, password, email, phone, detailAddress]);

    // 인증번호 입력값과 인증 상태를 관리하는 상태 변수 추가
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const handleVerificationSubmit = () => {
        // 인증번호 검증 로직
        // 예: 서버로 인증번호 검증 요청을 보내거나, 프론트엔드에서 간단한 검증 수행
        // 여기서는 예시로 입력된 인증번호가 '1234'일 경우를 인증 성공으로 가정
        if (verificationCode === '1234') {
            setIsVerified(true);
            Swal.fire({
                title: '인증 성공',
                text: '인증이 완료되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
                confirmButtonColor: '#8ce650b2',
            });
        } else {
            // 인증번호가 일치하지 않을 때s
            Swal.fire({
                title: '인증 실패',
                text: '인증번호가 일치하지 않습니다.',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#e65a50b2',
            });
        }
    };


    // handleSignup을 조정하여 필드 유효성을 확인
    // handleSignup 함수
    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userTypeValue = isBusinessUser && isCompanyRegistrationNumVerified ? '사업자' : '일반';
        if (!isUserIdValid || !isUsernameValid || !isPasswordValid || !isEmailValid || !isPhoneValid || !isVerified) {
            Swal.fire({
                title: '필수 항목 누락',
                text: '모든 필수 항목을 채워주세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
            setIsLoading(false);
            return;
        }

        // 사업자 사용자이고, 사업자번호 인증이 완료되지 않았다면 경고 표시
        if (isBusinessUser && !isCompanyRegistrationNumVerified) {
            Swal.fire({
                title: '사업자번호 인증 필요',
                text: '사업자번호 인증을 완료해주세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
            setIsLoading(false);
            return;
        }

        // 주소와 상세 주소를 합친 전체 주소
        const fullAddress = getFullAddress();

        // 백엔드로 보낼 데이터 구조를 맞춥니다.
        const signupData = {
            userId: userid,
            userPwd: password,
            userNickName: username,
            userEmail: email,
            userContact: phone,
            userAddress: fullAddress,
            userType: userTypeValue,
            companyRegistNum: isBusinessUser ? companyRegistNum : null, // 사업자 사용자의 경우만 값을 전달
        };

        console.log("회원가입 데이터:", signupData);

        try {
            const response = await axios.post("/api/auth/user", signupData);

            // 응답 상태 코드에 따른 처리
            if (response.status === 201) {
                // 회원가입 성공 로직
                Swal.fire({
                    title: '회원가입 성공!',
                    text: '회원가입을 성공했습니다. 로그인 화면으로 이동하시겠습니까?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: '네, 이동합니다',
                    cancelButtonText: '아니오'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/signin";
                    } else {
                        window.location.href = "/";
                    }
                });
                setIsLoading(false);
                return; // 회원가입 성공 후 함수 종료
            }
        } catch (error) {
            // console.error('회원가입 에러:', error);

            if (error.response.data.message === "ID ALREADY EXIST") {
                Swal.fire({
                    text: "이미 사용 중인 아이디입니다.",
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            } else if (error.response.data.message === "EMAIL ALREADY EXIST") {
                Swal.fire({
                    text: "이미 사용 중인 이메일입니다.",
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            } else if (error.response.data.message === "CONTACT ALREADY EXIST") {
                Swal.fire({
                    text: "이미 사용 중인 연락처입니다.",
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            } else window.location.href = "/"

        } finally {
            setIsLoading(false); // Ensure isLoading is set to false when the request is complete
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // 주소와 상세 주소를 합쳐서 하나의 문자열로 만드는 함수
    const getFullAddress = () => {
        return address + (detailAddress ? `, ${detailAddress}` : '');
    };

    //타이머 시간 설정 
    const smsAuthBtn = async () => {
        setIsSmsSend(true);
        setTimer(180); // 타이머를 180초(3분)으로 설정
    }

    //타이머
    useEffect(() => {
        let interval = null;
        if (isSmsSend && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            // 타이머가 0이 되면 추가적인 처리를 할 수 있습니다 (예: 메시지 표시, 인증번호 입력 비활성화 등)
        }
        return () => clearInterval(interval);
    }, [isSmsSend, timer]);

    const formatTimer = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }


    // 아이디 중복 상태와 검사 진행 상태
    const [isUserIdUnique, setIsUserIdUnique] = useState(null);
    const [isCheckingUserId, setIsCheckingUserId] = useState(false);

    // 아이디 중복 검사 함수
    const checkUserId = async () => {
        setUseridTouched(true); // 사용자가 아이디 검사를 시도했다고 표시

        // 아이디 입력 확인
        if (!userid) {
            // 아이디 입력 확인
            Swal.fire({
                title: '입력 필요',
                text: '아이디를 입력해주세요.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
            return;
        }

        // 아이디 유효성 검사
        setIsUserIdValid(validateUserId(userid)); // 유효성 검증 결과에 따라 상태를 설정

        if (!isUserIdValid) {
            return; // 유효하지 않으면 여기서 함수 종료
        }

        setIsCheckingUserId(true); // 중복 검사 시작

        try {
            // 서버에 중복 검사 요청
            const response = await axios.get(`/api/auth/check-avilability-userid?userId=${userid}`);

            // 서버 응답에 따라 상태 업데이트
            if (response.status === 200) {
                // 응답 데이터가 사용 가능 여부를 나타내는 불린값이라고 가정
                setIsUserIdUnique(response.data); // true는 사용 가능, false는 사용 불가능을 의미
            } else {
                // 예상치 못한 상태 코드 처리
                console.error('예상치 못한 응답 상태:', response.status);
            }
        } catch (error) {
            console.error('아이디 중복 검사 중 에러 발생:', error);
            // 에러 발생 시 사용자에게 알리는 UI 로직을 추가할 수 있음
        }

        setIsCheckingUserId(false); // 검사 종료 상태 설정
    };


    //아이디 중복 검사
    const validateUserId = (userid) => {
        // 영문과 숫자를 포함하고 최소 3자 이상인지 확인하는 정규 표현식
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{3,}$/;
        return regex.test(userid);
    };

    // 비밀번호 유효성 상태 추가
    const [isPasswordComplex, setIsPasswordComplex] = useState(true);

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        // 숫자, 영문, 특수문자를 혼합하여 8자리 이상인지 확인하는 정규식
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    // 비밀번호 입력 필드의 onChange 및 onBlur 이벤트 핸들러 수정
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsPasswordValid(newPassword.trim() !== '');
        setIsPasswordComplex(validatePassword(newPassword)); // 유효성 검사 수행
    };

    const handlePasswordBlur = () => {
        setPasswordTouched(true);
        if (!validatePassword(password)) {
            setIsPasswordComplex(false);
        }
    };

    // 비밀번호 일치 상태 추가
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    // 비밀번호 확인 입력 필드의 onChange 및 onBlur 이벤트 핸들러
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setIsPasswordMatch(password === newConfirmPassword); // 비밀번호 일치 검사 수행
    };

    const handleConfirmPasswordBlur = () => {
        setConfirmPasswordTouched(true);
        setIsPasswordMatch(password === confirmPassword); // 비밀번호 일치 검사 수행
    };

    // 이메일 유효성 검사 함수
    const validateEmail = (email) => {
        return email.includes('@');
    };

    // 이메일 입력 필드의 onChange 및 onBlur 이벤트 핸들러
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // 유효성 검사는 onBlur에서 수행하므로 여기서는 상태 업데이트만 진행
    };

    const handleEmailBlur = () => {
        setEmailTouched(true);
        setIsEmailValid(validateEmail(email)); // onBlur 이벤트에서 유효성 검사 수행
    };



    return (
        <>
            {isLoading && <Loading />} {/* Show loading indicator when loading */}
            <Wrapper>
                <div className={style.signup}>
                    <div className={style.login_nav}>
                        <Sidenav />
                    </div>

                    <motion.div
                        className={style.signup_area}
                        initial={{ y: -250, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className={style.signup_title}>
                            {isBusinessUser ? '사업자 회원가입' : '일반 회원가입'}
                        </h1>

                        <form className={style.signup_form} onSubmit={handleSignup}>

                            <div className={style.input_wrapper}>
                                <div className={style.title_input}>
                                    <label className={style.input_label}>아이디</label>
                                    <div className={style.id_button}>
                                        <input
                                            type="text"
                                            placeholder="아이디"
                                            value={userid}
                                            onChange={(e) => {
                                                setUserid(e.target.value);
                                                setIsUserIdUnique(null); // 아이디 값이 변경될 때 중복 검사 상태 초기화
                                            }}
                                            onBlur={handleUseridBlur}
                                            className={style.signup_input}
                                        />
                                        <div onClick={checkUserId} className={style.check_id_button}>아이디검사</div>
                                    </div>
                                </div>
                                <div className={style.error_message_area}>
                                    {useridTouched && !isUserIdValid && <div className={style.error_message}>아이디를 영문, 숫자를 조합하여 3자리 이상으로 설정해 주세요.</div>}
                                    {/* {isCheckingUserId && <div className={style.checking_message}>중복 검사 중...</div>} */}
                                    {useridTouched && !isCheckingUserId && isUserIdValid && isUserIdUnique === null && <div className={style.prompt_message}>아이디 검사를 수행하세요.</div>}
                                    {useridTouched && !isCheckingUserId && isUserIdUnique === false && <div className={style.error_message}>이미 존재하는 아이디입니다.</div>}
                                    {useridTouched && !isCheckingUserId && isUserIdValid && isUserIdUnique && <div className={style.success_message}>사용 가능한 아이디입니다.</div>}
                                </div>
                            </div>


                            <div className={style.input_wrapper}>
                                <div className={style.title_input}>
                                    <label className={style.input_label}>이름</label>
                                    <input
                                        type="text"
                                        placeholder="이름"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setIsUsernameValid(e.target.value.trim() !== '');
                                        }}
                                        onBlur={handleUsernameBlur}
                                        className={style.signup_input}
                                    />
                                </div>
                                <div className={style.error_message_area}>
                                    {!isUsernameValid && usernameTouched && <div className={style.error_message}>이름을 입력해주세요</div>}
                                </div>
                            </div>

                            <div className={style.input_wrapper}>
                                <div className={style.title_input}>
                                    <label className={style.input_label}>비밀번호</label>
                                    <div className={style.password_container}>

                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            placeholder="비밀번호"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            onBlur={handlePasswordBlur}
                                            className={style.signup_input}
                                        />
                                        <img
                                            src={passwordVisible ? `${process.env.PUBLIC_URL}/images/eye1.svg` : `${process.env.PUBLIC_URL}/images/eye2.svg`}
                                            className={style.eye_icon}
                                            onClick={togglePasswordVisibility}
                                            alt="Toggle password visibility"
                                        />
                                    </div>
                                </div>
                                <div className={style.error_message_area}>
                                    {!isPasswordValid && passwordTouched && <div className={style.error_message}>비밀번호를 입력해주세요</div>}
                                    {isPasswordValid && passwordTouched && !isPasswordComplex && <div className={style.error_message}>비밀번호는 숫자, 영문, 특수문자를 혼합하여 8자리 이상으로 설정해주세요.</div>}
                                    {passwordTouched && isPasswordComplex && <div className={style.success_message}>사용 가능한 비밀번호입니다.</div>}
                                </div>
                            </div>

                            <div className={style.input_wrapper}>
                                <div className={style.title_input}>
                                    <label className={style.input_label}>비밀번호 확인</label>
                                    <input
                                        type={"password"}
                                        placeholder="비밀번호 확인"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={handleConfirmPasswordBlur}
                                        className={style.signup_input}
                                    />
                                </div>
                                <div className={style.error_message_area}>
                                    {confirmPasswordTouched && !isPasswordMatch && <div className={style.error_message}>비밀번호가 다릅니다.</div>}
                                    {confirmPasswordTouched && isPasswordMatch && <div className={style.success_message}>비밀번호가 동일합니다.</div>}
                                </div>
                            </div>

                            <div className={style.email_wrapper}>
                                <div className={style.email_put}>
                                    <div className={style.title_input}>
                                        <label className={style.input_label}>이메일</label>
                                        <input
                                            type="email"
                                            placeholder="이메일"
                                            value={email}
                                            onChange={handleEmailChange}
                                            onBlur={handleEmailBlur}
                                            className={style.email_input}
                                        />
                                    </div>
                                </div>
                                <p className={style.email_how}>이메일은 아이디, 비밀번호 찾기에 활용됩니다. 실제 사용하는 이메일을 입력해주세요.</p>
                                <div className={style.error_message_area}>
                                    {!isEmailValid && emailTouched && <div className={style.error_message}>올바른 이메일을 입력해주세요.</div>}
                                </div>
                            </div>


                            <div className={style.input_with_button_wrapper}>
                                <div className={style.sms_wrapper}>
                                    <label className={style.input_label}>연락처</label>
                                    <div className={style.sms_button}>
                                        <div className={style.sms_send}>
                                            <input type="text" placeholder="연락처" value={phone} onChange={(e) => setPhone(e.target.value)} className={style.sms_input1} />
                                            <div onClick={smsAuthBtn} className={style.send_code_button}>인증번호발송</div>
                                        </div>
                                        {isSmsSend && (
                                            <div className={style.sms_verification}>
                                                <input className={style.sms_input} placeholder="인증번호를 입력하세요." value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                                                <span className={style.timer}>{timer != null ? formatTimer() : ''}</span> {/* 타이머 표시 */}
                                                <div onClick={handleVerificationSubmit} className={style.submit_code_button}>제출</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={style.input_with_button_wrapper}>
                                <div className={style.input_wrapper}>
                                    <div className={style.title_input}>
                                        <label className={style.input_label}>주소</label>
                                        <div className={style.address_area}>
                                            <div className={style.address_input_button}>
                                                <input
                                                    type="text"
                                                    value={address}
                                                    className={style.signup_input1}
                                                    readOnly
                                                />
                                                <DaumPost setAddress={setAddress} />
                                            </div>
                                            <input type="text" placeholder="상세주소를 입력하세요." value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} className={style.signup_input_detail} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isBusinessUser && (
                                <div className={style.bisnum_wrapper}>
                                    <div className={style.title_input}>
                                        <label className={style.input_label}>사업자번호</label>
                                        <div className={style.bis_button}>
                                            <Business
                                                setCompanyRegistrationNum={setCompanyRegistNum}
                                                setIsCompanyRegistrationNumVerified={setIsCompanyRegistrationNumVerified}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className={style.signup_button}
                                onClick={() => {
                                    if (!isUserIdValid || !isUsernameValid || !isPasswordValid || !isEmailValid || !isPhoneValid || !isVerified) {
                                        Swal.fire({
                                            title: '필수 항목 누락',
                                            text: '모든 필수 항목을 채워주세요.',
                                            icon: 'warning',
                                            confirmButtonText: '확인'
                                        });
                                    }
                                }}
                            >
                                회원가입
                            </button>
                        </form>


                    </motion.div>
                </div>
            </Wrapper>
        </>
    );
}

export default Signup;