import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./AdminPageContract.module.css";
import { useSelector } from "react-redux";
import ContractModal from "./ContractModal";
import Loading from "../../loading/Loading";
import Swal from 'sweetalert2';

function AdminPageContract() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage] = useState(10);
  const [selectedContract, setSelectedContract] = useState(null); //모달
  const [isLoadingContract, setIsLoadingContract] = useState(false);


  const fetchContractDetails = async (contractId) => {
    const response = await axios.get(`/api/contract/details/${contractId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setSelectedContract(response.data); // Set the contract data
  };

  const handleContractClick = async (contractId) => {
    setIsLoadingContract(true);
    try {
      await fetchContractDetails(contractId);
    } catch (error) {
      console.error("Error fetching contract details:", error);
      setSelectedContract(null);
    } finally {
      setIsLoadingContract(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchContracts(); // accessToken이 있을 때만 계약 목록을 가져옵니다.
    }
  }, [accessToken]);

  const fetchContracts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/contract/list", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // 계약 ID 기준으로 내림차순 정렬
      const sortedContracts = response.data.sort((a, b) =>
        parseInt(b.contractId) - parseInt(a.contractId)
      );
      setContracts(sortedContracts); // 정렬된 배열을 상태로 설정
    } catch (error) {
      console.error("계약 목록 불러오기 오류:", error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료
    }
  };

  const handleApprove = async (contractId) => {
    Swal.fire({
      title: '정말 승인하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        // 승인 로직 실행
        approveContract(contractId);
      }
    });
  };

  const approveContract = async (contractId) => {
    try {
      await axios.patch(
        `/api/contract/status/${contractId}/approved`, {}, { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      Swal.fire('승인됨!', '계약이 성공적으로 승인되었습니다.', 'success');
      fetchContracts(); // 목록 새로고침
    } catch (error) {
      console.error(error);
      Swal.fire('실패!', '승인 처리 중 오류가 발생했습니다.', 'error');
    }
  };

  const handleReject = async (contractId) => {
    Swal.fire({
      title: '정말 비승인 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '비승인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        // 비승인 로직 실행
        rejectContract(contractId);
      }
    });
  };

  const rejectContract = async (contractId) => {
    try {
      await axios.patch(
        `/api/contract/status/${contractId}/rejected`, {}, { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      Swal.fire('비승인됨!', '계약이 성공적으로 비승인되었습니다.', 'success');
      fetchContracts(); // 목록 새로고침
    } catch (error) {
      console.error(error);
      Swal.fire('실패!', '비승인 처리 중 오류가 발생했습니다.', 'error');
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
            <th>공고 ID</th>
            <th>회사명</th>
            <th>승인상태</th>
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
              <tr key={contract.contractId} onClick={() => handleContractClick(contract.contractId)} className={style.admin_contract_click}>
                <td data-label="계약 ID">{contract.contractId}
                </td>
                <td data-label="계약신청일">{contract.contractAplDate}</td>
                <td data-label="공고 ID">{contract.announceId}</td>
                <td data-label="회사명">{contract.companyName}</td>
                <td data-label="승인상태">{contract.contractStatus}</td>
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


      {isLoadingContract && <Loading />}



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

        {selectedContract && (
          <ContractModal
            contract={selectedContract}
            onClose={() => setSelectedContract(null)}
          />
        )}

      </div>
    </div>
  );
}

export default AdminPageContract;
