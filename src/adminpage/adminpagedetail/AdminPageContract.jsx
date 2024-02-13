import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./AdminPageContract.module.css";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function AdminPageContract() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage] = useState(10);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    setIsLoading(true);
    const persistRoot = JSON.parse(
      localStorage.getItem("persist:root") || "{}"
    );
    const accessToken = persistRoot.auth
      ? JSON.parse(persistRoot.auth).accessToken
      : "";

    try {
      const response = await axios.get("/api/contract/list", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setContracts(response.data);
    } catch (error) {
      console.error("계약 목록 불러오기 오류:", error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료
    }
  };

  const handleApprove = async (contractId) => {
    if (!window.confirm("정말 승인하시겠습니까?")) return;

    try {
      await axios.patch(
        `/api/contract/status/${contractId}/approved`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("승인되었습니다.");
      fetchContracts(); // 목록 새로고침
    } catch (error) {
      alert("승인 처리 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료
    }
  };

  const handleReject = async (contractId) => {
    if (!window.confirm("정말 비승인 하시겠습니까?")) return;

    const accessToken = JSON.parse(localStorage.getItem("persist:root") || "{}")
      .auth?.accessToken;
    try {
      await axios.patch(
        `/api/contract/status/${contractId}/rejected`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("비승인되었습니다.");
      fetchContracts(); // 목록 새로고침
    } catch (error) {
      alert("비승인 처리 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료
    }
  };

  // 현재 페이지에서 보여줄 계약 목록 계산
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = contracts.slice(
    indexOfFirstContract,
    indexOfLastContract
  );

  // 페이지 번호들을 위한 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(contracts.length / contractsPerPage); i++) {
    pageNumbers.push(i);
  }

  const skeletonCount = 3;

  return (
    <div>
      <h2 className={style.admincontract_title}>계약 신청 목록</h2>
      <table className={style.admincontract_table}>
        <thead>
          <tr>
            <th>계약 ID</th>
            <th>계약신청일</th>
            <th>계약상태</th>
            <th>공고 ID</th>
            <th>회사명</th>
            <th>승인/비승인</th>
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
            : currentContracts.map((contract) => (
              <tr key={contract.contractId}>
                <td>{contract.contractId}</td>
                <td>{contract.contractAplDate}</td>
                <td>{contract.contractStatus}</td>
                <td>{contract.announceId}</td>
                <td>{contract.companyName}</td>
                <td>
                  <button onClick={() => handleApprove(contract.contractId)} className={style.admin_approvebtn}>
                    승인
                  </button>
                  <button onClick={() => handleReject(contract.contractId)} className={style.admin_rejectbtn}>
                    비승인
                  </button>
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

export default AdminPageContract;
