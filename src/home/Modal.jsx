import React from 'react';

function Modal({ closeModal, children }) {
  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 모달 닫기 버튼 */}
        <button className="modal-close-btn" onClick={closeModal}>
          ✖
        </button>
        현재지역
        {/* 모달 내용 */}
        {children}
      </div>
    </div>
  );
}

export default Modal;