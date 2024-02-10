import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Wrapper from "../pagechange/Wrapper";
import Sidenav from "../sidenav/Sidenav";
import style from "./ContractVer.module.css";
import { motion } from "framer-motion";

function ContractVer() {
  const navigate = useNavigate();
  const [isCompanyInfoRegistered, setIsCompanyInfoRegistered] = useState(null);

  useEffect(() => {
    const persistRoot = localStorage.getItem("persist:root")
      ? JSON.parse(localStorage.getItem("persist:root"))
      : null;
    const userType =
      persistRoot && persistRoot.auth
        ? JSON.parse(persistRoot.auth).userType
        : "";

    if (userType !== "BUSINESS") {
      alert("사업자 회원만 사용하실 수 있는 메뉴입니다.");
      navigate("/map"); // 또는 사용자를 로그인 페이지로 리디렉션
      return;
    }

    checkCompanyInfo();
  }, []);

  const checkCompanyInfo = async () => {
    const persistRoot = localStorage.getItem("persist:root")
      ? JSON.parse(localStorage.getItem("persist:root"))
      : null;
    const accessToken =
      persistRoot && persistRoot.auth
        ? JSON.parse(persistRoot.auth).accessToken
        : "";

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("/api/company/validate-info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // 응답 바디에서 true 또는 false 값을 읽어와서 상태를 설정합니다.
      setIsCompanyInfoRegistered(response.data); // response.data는 true 또는 false를 가정
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
      // 회사 정보가 이미 등록된 경우
      alert("회사정보를 이미 입력하셨습니다. 수거계약 신청을 해 주세요.");
    }
  };

  const handleContractClick = () => {
    if (isCompanyInfoRegistered === false) {
      // 회사 정보가 이미 등록된 경우
      navigate("/contract");
    } else {
      // 회사 정보가 등록되지 않은 경우
      alert("회사정보를 작성해 주세요.");
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
