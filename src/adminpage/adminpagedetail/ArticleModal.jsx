const ArticleModal = ({ article, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h2>{article.articleTitle}</h2>
      <p>{article.articleContents}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default ArticleModal;
