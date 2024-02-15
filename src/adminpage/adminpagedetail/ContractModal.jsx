import style from "./AdminPageContract.module.css";
import { motion } from "framer-motion";

function ContractModal({ contract, onClose }) {


    const modalVariants = {
        hidden: {
            scale: 0,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <div className={style.modalBackground}>
            <motion.div
                className={style.modalContent}
                variants={modalVariants} // 애니메이션 변형 적용
                initial="hidden" // 초기 상태 설정
                animate="visible" // 애니메이션 대상 상태 설정
            >
                <h2 className={style.modalcontent_title}>계약 상세 정보</h2>
                {/* 여기에 contract 객체의 정보를 출력합니다. */}
                <p className={style.modalcontent_detail}>계약 ID: {contract.contractId}</p>
                <p className={style.modalcontent_detail}>계약신청일: {contract.contractAplDate}</p>
                <p className={style.modalcontent_detail}>입찰금액: {contract.contractPrice}</p>
                <p className={style.modalcontent_detail}>승인상태: {contract.contractStatus}</p>
                <p className={style.modalcontent_detail}>공고번호: {contract.announceId}</p>
                <p className={style.modalcontent_detail}>사업자등록번호: {contract.companyRegistNum}</p>
                <p className={style.modalcontent_detail}>법인명칭: {contract.companyName}</p>
                <p className={style.modalcontent_detail}>법인주소: {contract.companyAddress}</p>
                <p className={style.modalcontent_detail}>연락처: {contract.companyContact}</p>
                <button onClick={onClose} className={style.contract_modal_button}>닫기</button>
            </motion.div>
        </div>
    );
}

export default ContractModal;