import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleModal from "./ArticleModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./AdminPageBoard.module.css";
import Loading from "../../loading/Loading";

function AdminPageBoard() {
  const [activeTab, setActiveTab] = useState("FREE");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);

  useEffect(() => {
    fetchArticles(activeTab);
  }, [activeTab, currentPage]);

  const fetchArticles = async (articleCtgr) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/board/articles?articleCtgr=${articleCtgr}`);
      if (response.status === 200) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleArticleClick = async (articleId) => {
    setIsLoadingArticle(true);
    try {
      const response = await axios.get(`/api/board/article/${articleId}`);
      if (response.status === 200) {
        setSelectedArticle(response.data);
      }
    } catch (error) {
      console.error("Error fetching article details:", error);
      setSelectedArticle(null);
    } finally {
      setIsLoadingArticle(false);
    }
  };

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const skeletonCount = 3;


  return (
    <div>
      <h2 className={style.adminboard_title}>게시글 목록</h2>
      <div className="tabs">
        <button
          onClick={() => handleTabClick("FREE")}
          className={activeTab === "FREE" ? "active" : ""}
        >
          자유게시판
        </button>
        <button
          onClick={() => handleTabClick("QNA")}
          className={activeTab === "QNA" ? "active" : ""}
        >
          질문게시판
        </button>
        <button
          onClick={() => handleTabClick("NOTICE")}
          className={activeTab === "NOTICE" ? "active" : ""}
        >
          공지사항
        </button>
      </div>

      <div className="tabContent">
        <table className={style.adminboard_table}>
          <thead>
            <tr>
              <th>게시글 ID</th>
              <th>제목</th>
              <th>작성일</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>좋아요 수</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? // 로딩 중 스켈레톤 표시
              Array.from({ length: skeletonCount }, (_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton className={style.skeleton_shimmer} />
                  </td>
                  <td>
                    <Skeleton className={style.skeleton_shimmer} />
                  </td>
                  <td>
                    <Skeleton className={style.skeleton_shimmer} />
                  </td>
                  <td>
                    <Skeleton className={style.skeleton_shimmer} />
                  </td>
                  <td>
                    <Skeleton className={style.skeleton_shimmer} />
                  </td>
                  <td>
                    <Skeleton className={style.skeleton_shimmer} />
                  </td>
                </tr>
              ))
              : // Ensure this opening parenthesis for the map function is removed
              articles.map((article) => (
                <tr key={article.articleId}>
                  <td>{article.articleId}</td>
                  <td
                    onClick={() => handleArticleClick(article.articleId)}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    {article.articleTitle}
                  </td>
                  <td>
                    {new Date(article.articleCreatedDate).toLocaleString()}
                  </td>
                  <td>{article.userId}</td>
                  <td>{article.articleViewCounts ?? "0"}</td>
                  <td>{article.articleLikes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isLoadingArticle && <Loading />}

      {/* 페이지네이션 버튼 */}
      <div className={style.pagination1}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>

        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPageBoard;
