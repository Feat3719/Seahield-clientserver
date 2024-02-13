import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Wrapper from "../pagechange/Wrapper";
import Sidenav from "../sidenav/Sidenav";
import style from "./ContractVer.module.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ContractVer() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userType = useSelector((state) => state.auth.userType); // userType을 Redux Store에서 가져옴
  const navigate = useNavigate();
  const [isCompanyInfoRegistered, setIsCompanyInfoRegistered] = useState(null);

  useEffect(() => {
    // 사업자(BUSINESS) 또는 관리자(ADMIN)만 접근 가능하도록 변경
    if (userType !== "BUSINESS" && userType !== "ADMIN") {
      Swal.fire({
        icon: 'error',
        title: '접근 제한',
        text: '사업자 또는 관리자 회원만 사용하실 수 있는 메뉴입니다.',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/map");
        }
      });
      return;
    }

    checkCompanyInfo();
  }, [accessToken, userType, navigate]); // 의존성 배열에 userType 추가

  const checkCompanyInfo = async () => {
    if (!accessToken) {
      Swal.fire({
        icon: 'warning',
        title: '로그인 필요',
        text: '로그인이 필요합니다.',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin");
        }
      });
      return;
    }

    try {
      const response = await axios.get("/api/company/validate-info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setIsCompanyInfoRegistered(response.data); // 예상되는 응답: true 또는 false
    } catch (error) {
      console.error("회사 정보 검증 오류", error);
      alert("회사 정보 검증 중 오류가 발생했습니다.");
    }
  };

  const handleCompanyInfoClick = () => {
    if (isCompanyInfoRegistered === true) {
      // 회사 정보가 등록되지 않은 경우
      navigate("/companyinfo");
    } else {
      Swal.fire('회사정보를 이미 입력하셨습니다.', '수거계약 신청을 해 주세요.', 'info');
    }
  };

  const handleContractClick = () => {
    if (isCompanyInfoRegistered === false) {
      // 회사 정보가 이미 등록된 경우
      navigate("/contract");
    } else {
      Swal.fire('회사정보를 작성해 주세요.', '', 'warning');
    }
  };

  return (
    <Wrapper>
      <div className={style.contractver}>
        <div className={style.login_nav}>
          <Sidenav />
        </div>

        <motion.div
          className={style.contractver_area}
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className={style.contractver_title}>
            수거계약신청이 처음이신가요?
          </h1>

          <div className={style.select_area}>
            <motion.div
              className={style.select_area1}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "hover", stiffness: 300 }}
              onClick={handleCompanyInfoClick}
            >
              <p className={style.select_1}>처음이시라면?</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/company_info.svg`}
                alt="user"
                className={style.info_img}
              />
              <p className={style.select_2}>회사 정보 입력하기</p>
            </motion.div>

            <motion.div
              className={style.select_area1}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "hover", stiffness: 300 }}
              onClick={handleContractClick}
            >
              <p className={style.select_1}>처음이 아니시라면?</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/contract_paper.svg`}
                alt="contract_paper"
                className={style.contract_img}
              />
              <p className={style.select_2}>수거계약 신청서 작성하기</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
}

export default ContractVer;
