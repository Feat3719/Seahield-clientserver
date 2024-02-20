import React from 'react';
import style from './MypageRegular.module.css'; // 모달에 대한 스타일
import Loading from '../loading/Loading';

function ModalMypageContract({ isOpen, onClose, contract, isLoading }) {
    if (!isOpen) return null;

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContent}>
                <div className={style.modalContent_btn}>
                    <button onClick={onClose} className={style.closeButton}>X</button>
                </div>
                {isLoading ? (
                    <Loading /> // Show loading component when data is being fetched
                ) : (
                    <div>
                        <div className={style.modalHeader}>
                            <h5 className={style.modalcontent_title}>계약 상세 정보</h5>
                        </div>
                        <div className={style.modalBody}>
                            <p className={style.contract_detail}>계약 번호: {contract.contractId}</p>
                            <p className={style.contract_detail}>계약 날짜: {contract.contractAplDate}</p>
                            <p className={style.contract_detail}>계약 가격: {contract.contractPrice}</p>
                            <p className={style.contract_detail}>계약 상태: {contract.contractStatus}</p>
                            <p className={style.contract_detail}>공고 번호: {contract.announceId}</p>
                            <p className={style.contract_detail}>공고 이름: {contract.announceName}</p>
                            <p className={style.contract_detail}>공고 내용: {contract.announceContets}</p>
                            <p className={style.contract_detail}>공고 일자: {contract.announceCreatedDate}</p>
                            <p className={style.contract_detail}>사업자번호: {contract.companyRegistNum}</p>
                            <p className={style.contract_detail}>법인명: {contract.conpanyName}</p>
                            <p className={style.contract_detail}>법인 주소: {contract.companyAddress}</p>
                            <p className={style.contract_detail}>법인 연락처: {contract.companyContact}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalMypageContract;