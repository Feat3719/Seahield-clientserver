import { useRef, useState } from 'react';
import Wrapper from '../pagechange/Wrapper';
import Sidenav from '../sidenav/Sidenav';
import style from './Contract.module.css';
import { motion } from 'framer-motion'
import SignatureCanvas from 'react-signature-canvas';


function Contract() {
    //서명
    const [signature, setSignature] = useState(null);
    const [isSigning, setIsSigning] = useState(false);
    const sigPad = useRef(null);

    const saveSignature = () => {
        if (!sigPad.current.isEmpty()) {
            setSignature(sigPad.current.toDataURL());
            setIsSigning(false);
        } else {
            alert('서명이 제공되지 않았습니다.');
        }
    };

    const clearSignature = () => {
        if (sigPad.current) {
            sigPad.current.clear();
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
                                        <input className={style.form_input} placeholder="00-0000-0000" />
                                    </div>
                                    <div className={style.form_date}>
                                        <label className={style.form_label}>신청일자</label>
                                        <input className={style.form_input} placeholder="YYYY-MM-DD" />
                                    </div>
                                </div>

                                <div className={style.form_top_row2}>
                                    <div className={style.form_date}>
                                        <label className={style.form_label}>공고명</label>
                                        <input className={style.form_input} placeholder="목포 해양쓰레기 수거의 건" />
                                    </div>
                                    <div className={style.form_date}>
                                        <label className={style.form_label}>입찰금액</label>
                                        <input className={style.form_input} placeholder="30000원정" />
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
                                    <label className={style.form_label}>법인(사업자) 등록번호</label>
                                    <input className={style.form_input} placeholder="000-00-000000" />
                                </div>

                            </div>
                        </div>


                        <div className={style.info_container}>
                            <div className={style.form_footer}>
                                <p className={style.form_footer_text}>
                                    본인은 이 입찰이 귀 기관에 의하여 수락되면 계약 일반조건 사항에 따라 위의 입찰금액으로 확약하며 신청서를 제출합니다.
                                </p>
                                <div className={style.signature_area}>
                                    <p className={style.form_footer_text}>입찰자(대표자) : <input className={style.sign_input} placeholder="홍길동" />(인)</p>
                                    {signature && (
                                        <img
                                            src={signature}
                                            alt="Signature"
                                            className={style.signature_image} // Use style.signature_image here
                                        />
                                    )}
                                </div>
                                <div className={style.sign_btn} onClick={() => setIsSigning(true)}>
                                    서명하기
                                </div>
                                {isSigning && (
                                    <div className={style.signature_modal}>
                                        <SignatureCanvas
                                            ref={sigPad}
                                            penColor='black'
                                            canvasProps={{
                                                width: "150vh",
                                                height: "150vh",
                                                className: style.sigCanvas
                                            }}
                                        />
                                        <button className={style.sign_save} onClick={saveSignature}>저장</button>
                                        <button className={style.sign_delete} onClick={clearSignature}>지우기</button>
                                    </div>
                                )}

                                <div className={style.signature_display}>
                                    <div className={style.contract_btn} onClick={() => alert("hi")}>
                                        입찰신청
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div >
        </Wrapper >
    )
}

export default Contract;