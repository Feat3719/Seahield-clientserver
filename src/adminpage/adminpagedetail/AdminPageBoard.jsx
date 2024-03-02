import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./AdminPageBoard.module.css";
import Posts from "../../board/Posts";
import Pagination from "../../board/Pagination";

function AdminPageBoard() {
  const [activeTab, setActiveTab] = useState("FREE");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // `activeTab` 값을 기반으로 API 엔드포인트를 동적으로 결정합니다.
        const categoryParam = activeTab; // 예시: "FREE", "QNA", "NOTICE"
        const response = await axios.get(`/api/board/articles?articleCtgr=${categoryParam}`, {
          params: {
            page: currentPage,
            limit: postsPerPage,
          },
        });
        setPosts(response.data);
      } catch (error) {
        // console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [activeTab, currentPage, postsPerPage]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const skeletonCount = 3;


  return (
    <div className={style.adminboardpage}>
      <div className={style.tabs}>
        <button
          onClick={() => handleTabClick("FREE")}
          className={`${activeTab === "FREE" ? style.activeTab : ""} ${style.admin_tabbutton}`}
        >
          자유게시판
        </button>
        <button
          onClick={() => handleTabClick("QNA")}
          className={`${activeTab === "QNA" ? style.activeTab : ""} ${style.admin_tabbutton}`}
        >
          질문게시판
        </button>
        <button
          onClick={() => handleTabClick("NOTICE")}
          className={`${activeTab === "NOTICE" ? style.activeTab : ""} ${style.admin_tabbutton}`}
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
              <th>작성자</th>
              <th>조회수</th>
              <th>좋아요 수</th>
              <th>작성일</th>
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
              : <Posts posts={currentPosts(posts)} isLoading={isLoading} />
            }
          </tbody>
        </table>
      </div>

      <div id={style.paginationBox}>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        ></Pagination>
      </div>


    </div>
  );
}

export default AdminPageBoard;
