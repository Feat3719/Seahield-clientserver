import { useEffect, useState } from "react";
import axios from "axios";
import DaumPost from "../daumpost/DaumPost";
import Wrapper from "../pagechange/Wrapper";
import Sidenav from "../sidenav/Sidenav";
import style from "./CompanyInfo.module.css";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompanyInfo() {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [address, setAddress] = useState("");
  const [companyRegistNum, setCompanyRegistNum] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [detailAddress, setDetailAddress] = useState("");




  useEffect(() => {
    const fetchCompanyInfo = async () => {

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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '회사 정보를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.',
        });
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

  // 상세주소 입력 핸들러 함수
  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };


  const saveData = async () => {
    // 모든 필수 입력 확인
    if (!address || !companyRegistNum || !ceoName || !companyName || !phoneNumber || !socialSecurityNumber || !detailAddress) {
      Swal.fire({
        icon: 'warning',
        title: '필수 정보 누락',
        text: '항목을 모두 채워주세요.',
      });
      return;
    }


    // 전체 주소를 합침
    const fullAddress = `${address} ${detailAddress}`;

    const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const payload = {
      companyRegistNum,
      companyName,
      userNickname: ceoName,
      companyAddress: fullAddress, // 주소와 상세주소를 합친 값을 전송
      companyContact: formattedPhoneNumber,
    };

    try {
      const response = await axios.post("/api/company/info", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          title: '성공!',
          text: '입찰신청이 성공적으로 완료되었습니다. 수거계약신청 페이지로 이동하시겠습니까?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: '예',
          cancelButtonText: '아니요',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/contract'); // '예'를 선택한 경우
          } else {
            navigate('/map'); // '아니요'를 선택한 경우
          }
        });
      }
    } catch (error) {
      console.error("회사 정보 등록 실패:", error);
      Swal.fire({
        icon: 'error',
        title: '등록 실패',
        text: '회사 정보를 등록하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.',
      });
      // 에러 처리 로직을 여기에 추가하세요.
    }
  };


  useEffect(() => {
    const handleEnterPress = (event) => {
      if (event.keyCode === 13) {
        saveData();
      }
    };

    // 엔터 키 이벤트 리스너 등록
    document.addEventListener("keydown", handleEnterPress);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, []);


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
                    value={address}
                    readOnly
                  />
                  <DaumPost setAddress={setAddress} />
                </div>
                <input
                  className={style.form_input2}
                  placeholder="상세주소"
                  value={detailAddress} // 상태 바인딩
                  onChange={handleDetailAddressChange} // 변경 핸들러 연결
                />
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