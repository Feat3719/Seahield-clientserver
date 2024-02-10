import { useEffect, useState } from "react";
import axios from "axios";
import DaumPost from "../daumpost/DaumPost";
import Wrapper from "../pagechange/Wrapper";
import Sidenav from "../sidenav/Sidenav";
import style from "./CompanyInfo.module.css";
import { motion } from "framer-motion";

function CompanyInfo() {
  const [address, setAddress] = useState("");
  const [companyRegistNum, setCompanyRegistNum] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      // 'persist:root'에서 정보 가져오기
      const persistRoot = localStorage.getItem("persist:root");
      let accessToken = null;

      if (persistRoot) {
        const root = JSON.parse(persistRoot);
        // 'auth' 객체 내에서 accessToken 추출
        if (root.auth) {
          const auth = JSON.parse(root.auth);
          accessToken = auth.accessToken;
        }
      }

      if (!accessToken) {
        console.error("회사 정보 가져오기 실패: 액세스 토큰이 없습니다.");
        return;
      }

      try {
        const response = await axios.get("/api/company/default-info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setCompanyRegistNum(response.data.companyRegistNum);
          setCeoName(response.data.userNickname);
        }
      } catch (error) {
        console.error("회사 정보 가져오기 실패:", error);
        alert(
          "회사 정보를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요."
        );
      }
    };

    fetchCompanyInfo();
  }, []);

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/\D/g, "");
    if (onlyNums.length <= 3) {
      setPhoneNumber(onlyNums);
    } else if (onlyNums.length <= 7) {
      setPhoneNumber(`${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`);
    } else {
      setPhoneNumber(
        `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
          7,
          11
        )}`
      );
    }
  };

  const handleSocialSecurityNumberChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/\D/g, "");
    if (onlyNums.length <= 6) {
      setSocialSecurityNumber(onlyNums);
    } else {
      setSocialSecurityNumber(
        `${onlyNums.slice(0, 6)}-${onlyNums.slice(6, 13)}`
      );
    }
  };

  const saveData = async () => {
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const payload = {
      companyRegistNum: companyRegistNum,
      companyName: companyName,
      userNickname: ceoName,
      companyAddress: address,
      companyContact: formattedPhoneNumber,
    };

    try {
      const response = await axios.post("/api/company/info", payload, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("persist:root") &&
            JSON.parse(localStorage.getItem("persist:root")).auth
              ? JSON.parse(
                  JSON.parse(localStorage.getItem("persist:root")).auth
                ).accessToken
              : ""
          }`,
        },
      });

      if (response.status === 201) {
        alert("회사 정보가 성공적으로 등록되었습니다.");
        // 성공적으로 데이터가 저장된 후 필요한 로직을 여기에 추가하세요. 예를 들어, 페이지를 새로고침하거나 다른 페이지로 리다이렉션할 수 있습니다.
      }
    } catch (error) {
      console.error("회사 정보 등록 실패:", error);
      alert(
        "회사 정보를 등록하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요."
      );
      // 에러 처리 로직을 여기에 추가하세요.
    }
  };

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
          <h1 className={style.companyinfo_title}>회사정보 입력</h1>

          <div className={style.form_right_row}>
            <div className={style.form_date}>
              <label className={style.form_label}>상호 또는 법인명칭</label>
              <input
                className={style.form_input}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)} // 이 부분을 추가
                placeholder="법인명칭을 입력하세요."
              />
            </div>
            <div className={style.form_date}>
              <label className={style.form_label}>법인(사업자) 등록번호</label>
              <input
                className={style.form_input}
                value={companyRegistNum}
                readOnly={true}
                disabled
              />
            </div>
            <div className={style.form_date}>
              <label className={style.form_label}>대표자</label>
              <input
                className={style.form_input}
                value={ceoName}
                readOnly={true}
                disabled
              />
            </div>
            <div className={style.form_date}>
              <label className={style.form_label}>주소</label>
              <div className={style.form_address_area}>
                <div className={style.form_address}>
                  <input
                    className={style.address_input}
                    placeholder="주소를 검색하세요."
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
              <input
                className={style.form_input}
                placeholder="01000000000"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className={style.form_date}>
              <label className={style.form_label}>주민등록번호</label>
              <input
                className={style.form_input}
                placeholder="123456-1234567"
                value={socialSecurityNumber}
                onChange={handleSocialSecurityNumberChange}
              />
            </div>

            <div className={style.signature_display}>
              <div className={style.contract_btn} onClick={saveData}>
                등록하기
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
}

export default CompanyInfo;
