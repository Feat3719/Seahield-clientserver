// import Sidenav from '../sidenav/Sidenav';
// import { motion } from 'framer-motion'
// import Wrapper from '../pagechange/Wrapper';
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function MyEditPrev() {
    const accessToken = useSelector((state) => state.auth.accessToken);
  const [scene, setScene] = useState(0); // 0: 로딩 중, 1: 인증 실패, 2: 인증 성공
//   const [isValid, setIsValid] = useState(false);
  const [pwd, setPwd] = useState("");

  // 사용자 인증 상태 확인
  const checkUserValidity = async () => {
    try {
      const response = await axios.get(
        "/api/auth/check-avilability-userpwd",
        {
          params: {
            userPwd: pwd,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.isValid) {
        setPwd(response.data.userPwd);

        // setIsValid(true);
        setScene(2); // 인증 성공
      } else {
        // setIsValid(false);
        setScene(1); // 인증 실패
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    //   setIsValid(false);
      setScene(1); // 에러 발생 시 인증 실패로 처리
    }
  };

  checkUserValidity();

  const handleChange = (event) => {
    setPwd(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkUserValidity(); // 비밀번호 검증 함수 호출
  };

  // scene 상태에 따라 다른 화면을 렌더링하는 함수
  const renderScene = () => {
    switch (scene) {
      case 1:
        return <div>인증에 실패했습니다. </div>;
      case 2:
        return <div>인증에 성공했습니다!</div>;
      default:
        return (
          <div>
            <form onSubmit={handleSubmit}>
              비밀번호를 입력하세요:
              <input type="password" value={pwd} onChange={handleChange} />
              <button type="submit">확인</button>
            </form>
          </div>
        );
    }
  };
  return (
    <div>
      {/* <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
            />
            <button onClick={verifyPassword}>비밀번호 검증</button> */}
      {renderScene()} {/* scene 상태에 따른 화면 렌더링 */}
    </div>
  );
}
export default MyEditPrev;
