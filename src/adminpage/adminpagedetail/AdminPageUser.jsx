import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // 스켈레톤 컴포넌트를 임포트합니다.
import "react-loading-skeleton/dist/skeleton.css";
import style from "./AdminPageUser.module.css";
import { useSelector } from "react-redux";

function AdminPageUser() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      try {
        const response = await axios.get("/api/user/users-info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setUsers(Array.isArray(response.data) ? response.data : [response.data]);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };

    fetchUsers();
  }, [accessToken]); // useEffect의 의존성 배열에 accessToken 추가

  // 현재 페이지의 항목들만 표시하기 위한 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지네이션 컨트롤을 위한 함수들
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const skeletonCount = 3;

  return (
    <div>
      <h2 className={style.adminuser_title}>회원 목록</h2>
      <table className={style.adminuser_table}>
        <thead>
          <tr>
            <th className={style.th}>번호</th>
            <th className={style.th}>사용자 ID</th>
            <th className={style.th}>닉네임</th>
            <th className={style.th}>이메일</th>
            <th className={style.th}>연락처</th>
            <th className={style.th}>유형</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(skeletonCount)].map((_, index) => (
              <tr key={index}>
                <td><Skeleton /></td>
                <td><Skeleton className={style.skeleton_shimmer} /></td>
                <td><Skeleton className={style.skeleton_shimmer} /></td>
                <td><Skeleton className={style.skeleton_shimmer} /></td>
                <td><Skeleton className={style.skeleton_shimmer} /></td>
                <td><Skeleton className={style.skeleton_shimmer} /></td>
              </tr>
            ))
            : currentItems.map((user, index) => (
              <tr key={index}>
                <td data-label="번호">{indexOfFirstItem + index + 1}</td>
                <td data-label="사용자 ID">{user.userId}</td>
                <td data-label="닉네임">{user.userNickname}</td>
                <td data-label="이메일">{user.userEmail}</td>
                <td data-label="연락처">{user.userContact || "N/A"}</td>
                <td data-label="유형">{user.userType}</td>
              </tr>
            ))}
        </tbody>
      </table>
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
          disabled={currentPage === pageNumbers.length}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default AdminPageUser;
