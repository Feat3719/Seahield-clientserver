import { useEffect, useRef, useState } from "react";
import Wrapper from "../pagechange/Wrapper";
import Sidenav from "../sidenav/Sidenav";
import style from "./Contract.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import Swal from 'sweetalert2';

function Contract() {

  const today = new Date();
  const formattedToday = today.getFullYear() +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    ('0' + today.getDate()).slice(-2);

  const [announceId, setAnnounceId] = useState("");
  // 신청일자 상태에 오늘 날짜를 초기값으로 설정
  const [contractPrice, setContractPrice] = useState("");
  const [announceName, setAnnounceName] = useState("");

  const [companyRegistNum, setCompanyRegistNum] = useState("");
  const [ceoName, setCeoName] = useState("");
  const navigate = useNavigate();

  const [announceList, setAnnounceList] = useState([]);

  // 콤마 추가 함수
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 콤마 제거 함수
  const unformatNumber = (num) => {
    return num.replace(/,/g, '');
  };

  // 입찰금액 입력 처리
  const handleContractPriceChange = (e) => {
    // 숫자만 입력되도록 처리
    const { value } = e.target;
    const unformattedNumber = value.replace(/[^0-9]/g, '');
    setContractPrice(formatNumber(unformattedNumber));
  };


  //서명
  const [signature, setSignature] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const sigPad = useRef(null);

  const saveSignature = () => {
    if (!sigPad.current.isEmpty()) {
      setSignature(sigPad.current.toDataURL());
      setIsSigning(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '서명이 제공되지 않았습니다.',
      });
    }
  };

  const clearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
    }
  };

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      // localStorage에서 사업자 등록번호 가져오기
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '회사 정보를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.',
        });
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
          // 여기에서 setCeoName을 사용하여 대표자 이름을 상태에 저장합니다.
          setCeoName(response.data.userNickname); // 'userNickname' 필드에 대표자 이름이 있다고 가정
        }
      } catch (error) {
        // console.error("회사 정보 가져오기 실패:", error);
        alert(
          "회사 정보를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요."
        );
      }
    };

    fetchCompanyInfo();
  }, []);

  const submitContract = async () => {
    // 공고번호, 신청일자 등 필요한 데이터를 상태에서 추출하여 객체로 구성
    const contractData = {
      contractAplDate: formattedToday,
      contractPrice: parseInt(unformatNumber(contractPrice), 10), // 문자열을 숫자로 변환
      announceId: announceId,
      annoucneName: announceName, // 오타 확인 필요: annoucneName -> announceName
      companyRegistNum: companyRegistNum,
      userNickName: ceoName,
    };


    try {
      const response = await axios.post("/api/contract", contractData);
      if (response.status === 201) {
        Swal.fire(
          '성공!',
          '입찰신청이 성공적으로 완료되었습니다.',
          'success'
        ).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
            navigate('/mypageregular'); // 여기에 리다이렉션을 추가합니다.
          }
        });
      }
    } catch (error) {
      // console.error("입찰신청 실패:", error);
      Swal.fire({
        icon: 'error',
        title: '입찰신청 실패',
        text: '입찰신청에 실패하였습니다. 나중에 다시 시도해주세요.',
      });
    }
  };


  useEffect(() => {
    // 백엔드에서 공고 목록을 불러오는 함수
    const fetchAnnounceList = async () => {
      try {
        const response = await axios.get("/api/announce/in-apply");
        if (response.status === 200) {
          setAnnounceList(response.data);
        }
      } catch (error) {
        // console.error("공고 목록 불러오기 실패:", error);
        Swal.fire("오류", "공고 목록을 불러오는 데 실패했습니다.", "error");
      }
    };

    fetchAnnounceList();
  }, []);


  // 공고명 선택 시 공고번호 및 공고명 상태 설정
  const handleAnnounceSelect = (event) => {
    // 이벤트에서 공고명을 가져옵니다.
    const selectedAnnounceName = event.target.value;
    // 공고명으로 리스트에서 공고를 찾습니다.
    const selectedAnnounce = announceList.find(
      (announce) => announce.announceName === selectedAnnounceName
    );

    if (selectedAnnounce) {
      // 상태 업데이트
      setAnnounceId(selectedAnnounce.announceId);
      setAnnounceName(selectedAnnounce.announceName);
    } else {
      // 선택하지 않았을 때 로그
      // console.log("", "");
      setAnnounceId("");
      setAnnounceName("");
    }
  };


  return (
    <Wrapper>
      <div className={style.contract}>
        <div className={style.login_nav}>
          <Sidenav />
        </div>

        <motion.div
          className={style.contract_area}
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className={style.contract_title}>
            해양 폐기물 수거계약 입찰 신청서
          </h1>

          <div className={style.form_container}>
            <div className={style.form_top}>
              <div className={style.form_top_area}>
                <p className={style.form_top_title}>입찰내용</p>
              </div>

              <div className={style.form_top_contents}>
                <div className={style.form_top_row}>
                  <div className={style.form_date}>
                    <label className={style.form_label}>공고번호</label>
                    <input
                      className={style.form_input}
                      placeholder="자동으로 입력됩니다."
                      value={announceId}
                      readOnly
                    />
                  </div>

                  <div className={style.form_date}>
                    <label className={style.form_label}>신청일자</label>
                    <input
                      className={style.form_input}
                      value={formattedToday}
                      readOnly // 사용자가 값을 변경할 수 없도록 읽기 전용으로 설정
                    />
                  </div>
                </div>

                <div className={style.form_top_row2}>
                  <div className={style.form_date}>
                    <label className={style.form_label}>공고명</label>
                    <div className={style.select_area}>
                      <select
                        className={style.form_select}
                        value={announceName}
                        onChange={handleAnnounceSelect}
                      >
                        <option value="" disabled>공고를 선택하세요</option>
                        {announceList.map((announce) => (
                          <option key={announce.announceId} value={announce.announceName}>
                            {announce.announceName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={style.form_date}>
                    <label className={style.form_label}>입찰금액</label>
                    <input
                      className={style.form_input}
                      value={contractPrice}
                      onChange={handleContractPriceChange}
                      placeholder="입찰금액"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={style.form_bottom}>
              <div className={style.form_bottom_area}>
                <p className={style.form_bottom_title}>신청자</p>
              </div>

              <div className={style.form_bottom_contents}>
                <div className={style.form_date}>
                  <label className={style.form_label}>
                    법인(사업자) 등록번호
                  </label>
                  <input
                    className={style.form_input}
                    value={companyRegistNum}
                    onChange={(e) => setCompanyRegistNum(e.target.value)} // 사용자가 수동으로 변경할 수도 있게 합니다.
                    placeholder="000-00-00000"
                    readOnly // 필요에 따라 이 항목을 제거하여 사용자 입력을 허용할 수 있습니다.
                  />
                </div>
              </div>
            </div>

            <div className={style.info_container}>
              <div className={style.form_footer}>
                <p className={style.form_footer_text}>
                  본인은 이 입찰이 귀 기관에 의하여 수락되면 계약 일반조건
                  사항에 따라 위의 입찰금액으로 확약하며 신청서를 제출합니다.
                </p>
                <div className={style.signature_area}>
                  <p className={style.form_footer_text}>
                    입찰자(대표자) :{" "}
                    <input className={style.sign_input} placeholder="홍길동" />
                    (인)
                  </p>
                  {signature && (
                    <img
                      src={signature}
                      alt="Signature"
                      className={style.signature_image} // Use style.signature_image here
                    />
                  )}
                </div>
                <div
                  className={style.sign_btn}
                  onClick={() => setIsSigning(true)}
                >
                  서명하기
                </div>
                {isSigning && (
                  <div className={style.signature_modal}>
                    <SignatureCanvas
                      ref={sigPad}
                      penColor="black"
                      canvasProps={{
                        width: "150vh",
                        height: "150vh",
                        className: style.sigCanvas,
                      }}
                    />
                    <button className={style.sign_save} onClick={saveSignature}>
                      저장
                    </button>
                    <button
                      className={style.sign_delete}
                      onClick={clearSignature}
                    >
                      지우기
                    </button>
                  </div>
                )}

                <div className={style.signature_display}>
                  <div className={style.contract_btn} onClick={submitContract}>
                    입찰신청
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
}

export default Contract;
