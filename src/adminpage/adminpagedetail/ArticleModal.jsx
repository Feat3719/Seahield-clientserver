import style from "./AdminPageBoard.module.css";
import { motion } from "framer-motion";

const ArticleModal = ({ article, onClose }) => {


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
        <h2>{article.articleTitle}</h2>
        <p>{article.articleContents}</p>
        <button onClick={onClose}>닫기</button>
      </motion.div>
    </div>
  );
};

export default ArticleModal;
