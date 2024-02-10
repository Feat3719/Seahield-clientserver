import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // 스켈레톤 컴포넌트를 임포트합니다.
import "react-loading-skeleton/dist/skeleton.css";
import style from "./AdminPageUser.module.css";

function AdminPageUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      const persistRoot = localStorage.getItem("persist:root")
        ? JSON.parse(localStorage.getItem("persist:root"))
        : null;
      const accessToken =
        persistRoot && persistRoot.auth
          ? JSON.parse(persistRoot.auth).accessToken
          : "";

      try {
        const response = await axios.get("/api/user/users-info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setUsers(
            Array.isArray(response.data) ? response.data : [response.data]
          ); // 데이터가 배열 형태인지 확인하고 상태를 설정
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // 에러 처리 로직
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };

    fetchUsers();
  }, []);

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
      <h2>회원 목록</h2>
      <table>
        <thead>
          <tr>
            <th className={style.th}>사용자 ID</th>
            <th className={style.th}>닉네임</th>
            <th className={style.th}>이메일</th>
            <th className={style.th}>연락처</th>
            <th className={style.th}>유형</th>
            <th className={style.th}>가입일</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(skeletonCount)].map((_, index) => (
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
            : currentItems.map((user, index) => (
                <tr key={index}>
                  <td>{user.userId}</td>
                  <td>{user.userNickname}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.userContact || "N/A"}</td>
                  <td>{user.userType}</td>
                  <td>
                    {user.userJoinedYmd ? user.userJoinedYmd.join("-") : "N/A"}
                  </td>
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
