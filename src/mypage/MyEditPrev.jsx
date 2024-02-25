import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "./MypageRegular.module.css";


function MyEditPrev() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [scene, setScene] = useState(null); // 로딩 상태 제거
    const [pwd, setPwd] = useState("");
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userType, setUserType] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [isPwdValid, setIsPwdValid] = useState(false); // 비밀번호 유효성 상태
    const [userContact, setUserContact] = useState("");
    const [companyRegistNum, setCompanyRegistNum] = useState("");
    const [reenteredPwd, setReenteredPwd] = useState("");
    const [pwdMatch, setPwdMatch] = useState(true);

    // 정보 불러오는 부분________________________________
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/user/info", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                setUserId(response.data.userId);
                setUserPwd(response.data.userPwd);
                setUserNickname(response.data.userNickname);
                setUserType(response.data.userType);
                setUserEmail(response.data.userEmail);
                setUserContact(response.data.userContact);
                setUserAddress(response.data.userAddress);
                setCompanyRegistNum(response.data.companyRegistNum);
            } else {
                alert("다시 시도해 주세요");
                window.location.href = "/";
            }
        };
        fetchData();
    }, [accessToken]);


    // 정보 업데이트 부분___________________________________
    const updateUserInfo = async () => {
        if (userPwd !== reenteredPwd) {
            console.error("비밀번호가 일치하지 않습니다.");
            alert("비밀번호가 일치하지 않습니다.");
            setPwdMatch(false); // pwdMatch 상태 업데이트
            return; // 함수 실행 중단
        }

        try {
            const response = await axios.patch(
                "/api/user/info",
                {
                    userId,
                    userPwd,
                    userNickname,
                    userType,
                    userEmail,
                    userAddress,
                    userContact,
                    companyRegistNum,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("사용자 정보가 업데이트되었습니다.");
                setPwdMatch(true); // 성공 시 pwdMatch 상태를 true로 설정
                // 필요하다면 업데이트된 정보를 다시 가져와서 상태를 업데이트합니다.
            } else {
                alert("사용자 정보 업데이트에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error updating user info:", error);
            alert("사용자 정보 업데이트에 실패했습니다.");
        }
    };

    // 비밀번호 변경 핸들러
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        // 비밀번호 유효성 검사
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setIsPwdValid(regex.test(newPassword));
        // 비밀번호 일치 여부 검사
        setPwdMatch(newPassword === reenteredPwd);
    };

    // 비밀번호 재입력 변경 핸들러
    const handleReenteredPasswordChange = (e) => {
        const newPassword = e.target.value;
        setReenteredPwd(newPassword);
        // 여기서도 비밀번호 일치 여부를 검사
        setPwdMatch(newPassword === userPwd);
    };





    // 비밀번호 입력 핸들러
    const handleChange = (event) => {
        setPwd(event.target.value);
    };

    // 비밀번호 확인 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!pwd) { // 비밀번호 입력이 없는 경우 early return
            alert("비밀번호를 입력해주세요.");
            return;
        }
        try {
            const response = await axios.get("/api/auth/check-availability-userpwd", {
                params: {
                    userPwd: pwd, // 보안상의 이유로, 실제로는 이 방법은 피해야 합니다.
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            // 서버 응답 로깅
            console.log(response.data);
            // alert("@@@@@@@@@@@@")
            if (response.data.isValid !== null) {
                setScene(2); // 인증 성공
            } else {
                setScene(1); // 인증 실패
            }
        } catch (error) {
            console.error("Error verifying user:", error);
            setScene(1); // 에러 발생 시 인증 실패로 처리
        }
    };

    // scene 상태에 따라 다른 화면을 렌더링
    const renderScene = () => {
        // switch(scene) {
        // case 1:
        if (scene === 1) {

            return <div>인증에 실패했습니다.</div>;
        }
        // case 2:
        else if (scene === 2) {

            return (
                <div className={style.editTable}>
                    {/* <h2> 두 번째 장면 </h2> */}
                    <div style={{ position: "relative" }}
                        className={style.my_info_input_edit}
                    >
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            <div>이름:</div>
                            <input
                                type="text"
                                value={userNickname}
                                onChange={(e) => setUserNickname(e.target.value)}
                                placeholder="새로운 이름"
                                className={style.edit_input}
                            />
                        </div>
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            비밀번호: <input type="password" value={userPwd} onChange={handlePasswordChange} className={style.edit_input} />
                        </div>
                        {!isPwdValid && userPwd && (
                            <p style={{ color: 'red' }}>비밀번호는 8자 이상이며, 최소 하나의 문자, 숫자 및 특수 문자를 포함해야 합니다.</p>
                        )}
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            비밀번호 확인: <input type="password" value={reenteredPwd} onChange={handleReenteredPasswordChange} className={style.edit_input} />
                        </div>
                        {reenteredPwd && !pwdMatch && (
                            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
                        )}

                        {/* <p>
                        이메일 :
                        <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </p> */}
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            <div>주소 :</div>
                            <input
                                type="text"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                                className={style.edit_input}
                            />
                        </div>
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            <div>사업자 번호:</div>
                            <input value={companyRegistNum} disabled="True" className={style.edit_input} />
                        </div>
                        <button className={style.editBtn} onClick={updateUserInfo} disabled={!isPwdValid || !pwdMatch}>수정 완료</button>
                    </div>
                    {/* {!pwdMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
                    {!isPwdValid && userPwd && (
                    <p style={{ color: 'red' }}>비밀번호는 8자 이상이며, 최소 하나의 문자, 숫자 및 특수 문자를 포함해야 합니다.</p>
                    )} */}
                </div>
            );
        }
        // default:
        else {
            return <div className={style.password_describe}>비밀번호를 입력하여 인증해주세요.</div>;
        }
        // }
    };

    return (
        <div className={style.passwordinput}>
            {scene !== 2 && ( // scene이 2가 아닐 때만 폼을 렌더링합니다.
                <form onSubmit={handleSubmit}>
                    <label>
                        비밀번호를 입력하세요:
                        <input type="password" value={pwd} onChange={handleChange} placeholder="비밀번호" className={style.password_input} />
                        <button type="submit" className={style.password_submitbtn}>확인</button>
                    </label>
                </form>
            )}
            {renderScene()}
        </div>
    );
}

export default MyEditPrev;