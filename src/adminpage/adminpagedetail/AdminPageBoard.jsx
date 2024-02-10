import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleModal from "./ArticleModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./AdminPageUser.module.css";

function AdminPageBoard() {
  const [activeTab, setActiveTab] = useState("FREE");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);

  useEffect(() => {
    fetchArticles(activeTab);
  }, [activeTab, currentPage]); // activeTab 또는 currentPage가 변경될 때마다 데이터 재요청

  const fetchArticles = async (articleCtgr) => {
    setIsLoading(true); // 데이터 로딩 시작
    try {
      const response = await axios.get(
        `/api/board/articles?articleCtgr=${articleCtgr}`
      );
      if (response.status === 200) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // 탭을 변경할 때 페이지를 1로 리셋
  };

  // 게시글 제목 클릭 핸들러
  const handleArticleClick = async (articleId) => {
    try {
      const response = await axios.get(`/api/board/article/${articleId}`);
      if (response.status === 200) {
        setSelectedArticle(response.data); // 선택된 게시글의 상세 정보 저장
      }
    } catch (error) {
      console.error("Error fetching article details:", error);
      setSelectedArticle(null);
    }
  };

  // 페이지네이션 로직
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const skeletonCount = 3;

  return (
    <div>
      <h2>게시글 목록</h2>
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
        <button
          onClick={() => handleTabClick("ANNOUNCE")}
          className={activeTab === "ANNOUNCE" ? "active" : ""}
        >
          공고
        </button>
      </div>

      <div className="tabContent">
        <table>
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
