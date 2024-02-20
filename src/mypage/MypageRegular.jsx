import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./MypageRegular.module.css";
import Myslide from "./Myslide";
import DaumPost from "../daumpost/DaumPost";
import { useSelector } from "react-redux";
import Sidenav from "../sidenav/Sidenav";
// import { Link } from 'react-router-dom';
import MyEditPrev from "./MyEditPrev";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ModalMypageContract from "./ModalMypageContract";
// import { type } from "@testing-library/user-event/dist/type";

const MypageRegular = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    // const [userInfo, setUserInfo] = useState(null);
    // const [boardInfo, setBoardInfo] = useState(null);
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userType, setUserType] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [isPwdValid, setIsPwdValid] = useState(false); // 비밀번호 유효성 상태
    const [userContact, setUserContact] = useState("");
    const [companyRegistNum, setCompanyRegistNum] = useState("");

    // const [showDetail, setShowDetail] = useState("");
    const [scene, setScene] = useState(1);
    const [posts, setPosts] = useState([]);
    // const [articleCtgr, setArticleCtgr] = useState("");
    // const [articleTitle, setArticleTitle] = useState("");
    // const [contractId, setContractId] = useState([]);

    // const [contractStatus, setContractStatus] = useState("");
    // const [announceName, setAnnounceName] = useState("");
    const [contracts, setContracts] = useState([]); // 계약 목록 상태
    const [contractDetails, setContractDetails] = useState([]);
    const [reenteredPwd, setReenteredPwd] = useState("");
    const [pwdMatch, setPwdMatch] = useState(true);

    const [selectedContract, setSelectedContract] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    // const [data] = useState([
    //     { id: 1, aria: "포항", name: "구룡포대보해변", ctgr: "공지" },
    //     { id: 1, aria: "포항", name: "호미곶", ctgr: "자유" },
    //     { id: 2, aria: "울산", name: "울주진하해변", ctgr: "공고" },
    // ]);
    // 예시로 했던 부분
    // useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 코드
    // const fetchData = async () => {
    // 데이터 가져오기
    // const data1 = [
    //     {
    //     userId_1: 1,
    //     userName: "John",
    //     userType: "일반",
    //     boardTitle: "여긴어디",
    //     },
    //     {
    //     userId_1: 1,
    //     userName: "John",
    //     userType: "일반",
    //     boardTitle: "난 누구?",
    //     },
    //     { userId_1: 2, userName: "Jane", userType: "사업자" },
    //     { userId_1: 3, userName: "Doe", userType: "일반" },
    // ];

    // // 데이터 필터링
    // const filteredData = data1.filter((item) => item.userId_1 === 1);

    // // 필터링된 데이터를 상태로 설정
    // setUserInfo(filteredData);
    // };

    //     fetchData(); // fetchData 함수 호출
    // }, []); // useEffect를 한 번만 실행하기 위해 빈 배열 전달

    // 필터링된 데이터를 렌더링하는 함수
    // const renderFilteredData = () => {
    //     // userInfo가 존재할 때만 실행
    //     if (!userInfo) return null;

    //     // 필터링된 데이터를 매핑하여 JSX로 반환
    //     return userInfo.map(item => (
    //         <div key={item.userId}>
    //             <p>아이디 : {item.userId}</p>
    //             <p>이름 : {item.userName}</p>
    //             <p>유형 : {item.userType}</p>
    //         </div>
    //     ));
    // };

    const articleCategories = {
        FREE: '자유게시판',
        QNA: '질문게시판',
        NOTICE: '공지사항',
    };

    // 정보 불러오는 부분________________________________
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/user/info", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                setUserId(response.data.userId);
                setUserPwd(response.data.userPwd);
                setUserNickname(response.data.userNickname);
                setUserType(response.data.userType);
                setUserEmail(response.data.userEmail);
                setUserContact(response.data.userContact);
                setUserAddress(response.data.userAddress);
                setCompanyRegistNum(response.data.companyRegistNum);
            } else {
                alert("다시 시도해 주세요");
                window.location.href = "/";
            }
        };
        fetchData();
    }, [accessToken]);


    // 게시글 데이터를 불러오는 useEffect
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/user/articles', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setPosts(response.data); // 받아온 데이터를 posts 상태에 저장
                }
            } catch (error) {
                console.error("게시글을 불러오는 데 실패했습니다.", error);
            }
        };

        if (userNickname) { // 사용자 닉네임이 설정되어 있을 때만 게시글 데이터를 불러옴
            fetchPosts();
        }
    }, [userNickname, accessToken]);// userNickName이 변경될 때만 다시 호출
    // const updateUser = async () => {
    //     try {
    //         await fetch(`http://example.com/api/user/${userId}`, {
    //             method: 'ptch',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ name, email }), // 수정된 정보 전송
    //           });
    //           // 사용자 정보 다시 불러오기
    //           fetchUserInfo();
    //           // 입력 필드 초기화
    //           setName('');
    //           setEmail('');

    //     }catch (error){

    //     }

    // }


    const navigate = useNavigate();

    // 게시글 렌더링 부분
    const renderPosts = () => {
        if (!posts.length) { // If posts have not been loaded
            return [...Array(3)].map((_, index) => ( // Assuming you want three skeleton rows
                <tr key={index}>
                    <td><Skeleton className={style.skeleton_shimmer} height={20} /></td>
                    <td><Skeleton className={style.skeleton_shimmer} height={20} /></td>
                    <td><Skeleton className={style.skeleton_shimmer} height={20} /></td>
                </tr>
            ));
        }
        return posts.map((post, index) => (
            <tr key={index} onClick={() => navigate(`/boarddetail/${post.articleId}`)} className={style.board_detail}>
                <td>{userType}</td>
                <td>{articleCategories[post.articleCtgr] || <Skeleton />}</td>
                <td>{post.articleTitle || <Skeleton />}</td>
            </tr>
        ));
    };

    // 정보 업데이트 부분___________________________________
    const updateUserInfo = async () => {
        if (userPwd !== reenteredPwd) {
            console.error("비밀번호가 일치하지 않습니다.");
            alert("비밀번호가 일치하지 않습니다.");
            setPwdMatch(false); // pwdMatch 상태 업데이트
            return; // 함수 실행 중단
        }

        try {
            const response = await axios.patch(
                "/api/user/info",
                {
                    userId,
                    userPwd,
                    userNickname,
                    userType,
                    userEmail,
                    userAddress,
                    userContact,
                    companyRegistNum,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("사용자 정보가 업데이트되었습니다.");
                setPwdMatch(true); // 성공 시 pwdMatch 상태를 true로 설정
                // 필요하다면 업데이트된 정보를 다시 가져와서 상태를 업데이트합니다.
            } else {
                alert("사용자 정보 업데이트에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error updating user info:", error);
            alert("사용자 정보 업데이트에 실패했습니다.");
        }
    };
    // _______________비번 확인 관련_____________________

    //계약 아이디 조회
    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await axios.get("/api/contract/list", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setContracts(response.data); // 계약 목록 설정
                    // setContractId(response.data.contractId)
                }
            } catch (error) {
                console.error("계약 목록 불러오기 에러", error);
            }
        };
        fetchContracts();
    }, [accessToken]); // accessToken 변경 시 다시 실행

    // 두 번째 useEffect: 선택된 계약의 세부 사항 불러오기
    useEffect(() => {
        contracts.forEach((contract) => {
            const fetchContractDetails = async () => {
                try {
                    const response = await axios.get(`/api/contract/details/${contract.contractId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.status === 200) {
                        setContractDetails(prevDetails => [...prevDetails, response.data]); // 세부 사항 추가
                    }
                } catch (error) {
                    console.error("계약 세부 사항 불러오기 에러", error);
                }
            };

            fetchContractDetails();
        });
    }, [contracts, accessToken]);


    const renderContracts = () => {
        if (!contracts.length) { // If contracts have not been loaded
            return [...Array(3)].map((_, index) => ( // Assuming you want three skeleton rows
                <tr key={index}>
                    <td><Skeleton height={20} /></td>
                    <td><Skeleton height={20} /></td>
                    <td><Skeleton height={20} /></td>
                </tr>
            ));
        }
        return contractDetails.map((contract, index) => (
            <tr key={index} onClick={() => handleContractClick(contract.contractId)} className={style.contractRow}>
                <td>{contract.contractId || <Skeleton />}</td>
                <td>{contract.announceName || <Skeleton />}</td>
                <td>{contract.contractStatus || <Skeleton />}</td>
            </tr>
        ));
    };

    // 계약 상세 정보를 불러오는 함수
    const handleContractClick = async (contractId) => {
        setIsLoadingModal(true);
        try {
            const response = await axios.get(`/api/contract/details/${contractId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                setSelectedContract(response.data); // 계약 상세 정보 설정
                setIsModalOpen(true); // 모달 열기
            }
        } catch (error) {
            console.error('계약 정보를 가져오는 데 실패했습니다.', error);
            setIsLoadingModal(false);
        }
    };

    // 모달 닫기 함수
    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setSelectedContract(null); // 선택된 계약 정보 초기화
    };


    // 비밀번호 변경 핸들러
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setUserPwd(newPassword);
        // 비밀번호 유효성 검사
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setIsPwdValid(regex.test(newPassword));
        // 비밀번호 일치 여부 검사
        setPwdMatch(newPassword === reenteredPwd);
    };

    // 비밀번호 재입력 변경 핸들러
    const handleReenteredPasswordChange = (e) => {
        const newPassword = e.target.value;
        setReenteredPwd(newPassword);
        // 여기서도 비밀번호 일치 여부를 검사
        setPwdMatch(newPassword === userPwd);
    };






    const renderScene = () => {
        // switch (scene) {
        // case 1:
        if (scene === 1) {

            return (
                <div className={style.contract_title}>
                    <table className={style.my_table} >
                        <thead className={style.contract_title}>
                            <tr>
                                <td style={{ width: "45vw" }} className={style.my_td}> 사용자유형 </td>
                                <td style={{ width: "45vw", borderBottom: "black 1px solid" }} className={style.my_td}> 글 유형 </td>
                                <td style={{ width: "45vw", borderBottom: "black 1px solid" }} className={style.my_td}> 글 제목 </td>
                            </tr>
                        </thead>
                        <tbody className={style.contract_table}>
                            {renderPosts()}
                        </tbody>
                    </table>
                    <div className={style.myslide_form}>
                        <div className={style.liketitle}>좋아요한 게시글 목록</div>
                        <Myslide />
                    </div>
                </div>
            );
        }

        // case 2:
        else if (scene === 2) {

            return (
                <div className={style.editTable}>
                    {/* <h2> 두 번째 장면 </h2> */}
                    <div style={{ position: "relative" }}
                        className={style.my_info_input_edit}
                    >
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            <div>이름:</div>
                            <input
                                type="text"
                                value={userNickname}
                                onChange={(e) => setUserNickname(e.target.value)}
                                placeholder="새로운 이름"
                                className={style.edit_input}
                            />
                        </div>
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            비밀번호: <input type="password" value={userPwd} onChange={handlePasswordChange} className={style.edit_input} />
                        </div>
                        {!isPwdValid && userPwd && (
                            <p style={{ color: 'red' }}>비밀번호는 8자 이상이며, 최소 하나의 문자, 숫자 및 특수 문자를 포함해야 합니다.</p>
                        )}
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            비밀번호 확인: <input type="password" value={reenteredPwd} onChange={handleReenteredPasswordChange} className={style.edit_input} />
                        </div>
                        {reenteredPwd && !pwdMatch && (
                            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
                        )}

                        {/* <p>
                이메일 :
                <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                />
            </p> */}
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            <div>주소 :</div>
                            <input
                                type="text"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                                className={style.edit_input}
                            // style={{width:'20vw'}}
                            />
                        </div>
                        <div className={style.daumBtn}>
                            <DaumPost setAddress={setUserAddress} className={style.edit_input} />
                        </div>
                        <div style={{ justifyContent: "space-between", position: "relative", display: "flex", alignItems: 'center', transform: '0, -50%' }}>
                            <div>사업자 번호:</div>
                            <input value={companyRegistNum} disabled="True" className={style.edit_input} />
                        </div>
                        <button className={style.editBtn} onClick={updateUserInfo} disabled={!isPwdValid || !pwdMatch}>수정 완료</button>
                    </div>
                    {/* {!pwdMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
            {!isPwdValid && userPwd && (
            <p style={{ color: 'red' }}>비밀번호는 8자 이상이며, 최소 하나의 문자, 숫자 및 특수 문자를 포함해야 합니다.</p>
            )} */}
                </div>
            );
        }


        // case 3:
        else if (scene === 3) {
            return (
                <div className={style.contract_title}>
                    <table className={style.my_table}>
                        <thead className={style.contract_title}>
                            <tr>
                                <td className={style.my_td}>신청서 번호</td>
                                <td className={style.my_td}>공고명</td>
                                <td className={style.my_td}>승인여부</td>
                            </tr>
                        </thead>
                        <tbody className={style.contract_table}>
                            {renderContracts()}
                        </tbody>
                    </table>
                    {/* <div className={style.myslide_form}>
                        <Myslide />
                    </div> */}
                </div>
            );
        }

        // case 4 :
        else if (scene === 4) {
            return (
                <div>
                    {/* <Link to="/myeditprev"> </Link> */}
                    <MyEditPrev />
                </div>
            )
        }
        else {
            return null;
        }
    };
    // -------------------------
    const changeScene = (newScene) => {
        setScene(newScene);
    };

    return (
        <div className={style.mypage}>
            <Sidenav />
            {/* 일반인 마이페이지로 쓸부분 */}
            {userType === "일반" && (
                <div className={style.my_form}>
                    <h1 className={style.my_title}>마이 페이지_일반</h1>

                    <div className={style.my_info}>
                        <div>
                            <h2 className={style.my_info_name}>{userId}님 정보</h2>
                        </div>
                        {/* {userId ? ( */}
                        <div className={style.my_input_wrapper_1}>
                            {scene !== 0 && <div className={style.edit_1}>{renderScene()}</div>}

                            <form onSubmit={updateUserInfo}>
                                <div className={style.my_input_info}>
                                    <div>
                                        <p>아이디 : {userId}</p>
                                    </div>
                                    <div>
                                        <p>이름 : {userNickname}</p>
                                    </div>
                                    <div>
                                        <p>유형 : {userType}</p>
                                    </div>
                                    {/* 내정보 수정페이지로 렌더링해야함 */}


                                    <div>{/* <button type="submit">정보 수정</button> */}</div>
                                </div>
                            </form>
                            {/* <button onClick={updateUserInfo}>정보 수정</button> */}
                            <button className={style.transBtn} onClick={() => changeScene(1)}>1번 장면으로(내가쓴글)</button>
                            {/* <button className={style.transBtn} onClick={() => changeScene(2)}>2번 장면으로(정보수정)</button> */}
                            {/* <button className={style.transBtn} onClick={() => changeScene(3)}>3번 장면으로(계약관련)</button> */}
                            <button className={style.transBtn} onClick={() => changeScene(4)}>4번 장면으로(수정전비번확인)</button>

                            {/* <button onClick={handleShowDetail}>정보 상세</button> */}
                        </div>
                        {/* // ) : (
                
                    // )} */}
                    </div>


                    {/* <div className={style.myslide_form}>
            <Myslide />
        </div> */}

                    {/* <div className={style.edit_1}>{renderScene()}</div> */}
                </div>
            )}
            {/* 여기까지 일반인 페이지 조건만 바꾸면 됨 */}

            <div className={style.mypage}>
                {/* 사업자페이지로 쓸부분 */}
                {userType === "사업자" && (
                    <div className={style.my_form}>
                        <h1 className={style.my_title}>마이 페이지_사업자</h1>

                        <div className={style.my_info}>
                            <div className={style.info_area}>
                                <h2 className={style.my_info_name}>{userNickname}님 정보</h2>
                                <div className={style.my_input_wrapper_1}>
                                    {scene !== 0 && <div className={style.edit_1}>{renderScene()}</div>}
                                    <form onSubmit={updateUserInfo}>
                                        <div className={style.my_input_info}>
                                            <div>
                                                <p>아이디 : {userId}</p>
                                            </div>
                                            <div>
                                                <p>이름 : {userNickname}</p>
                                            </div>
                                            <div>
                                                <p>유형 : {userType}</p>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                                {/* <button onClick={updateUserInfo}>정보 수정</button> */}
                                {/* <button onClick={handleShowDetail}>내정보 상세보기</button> */}

                                <div className={style.mypage_btn}>
                                    {/* 장면에 따라 다른 JSX를 렌더링합니다. */}
                                    {/* {renderScene()} */}
                                    {/* 장면 변경 버튼을 추가합니다. */}
                                    <button className={style.transBtn} onClick={() => changeScene(1)}>작성한 게시글</button>
                                    {/* <button className={style.transBtn} onClick={() => changeScene(2)}>2번 장면으로(그냥수정)</button> */}
                                    <button className={style.transBtn} onClick={() => changeScene(3)}>신청한 계약서 목록</button>
                                    <button className={style.transBtn} onClick={() => changeScene(4)}>회원정보수정</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className={style.edit_1}>{renderScene()}</div> */}
                    </div>
                )}
                {/* 일반 조건 마감부분 --> 이 부분 사업자 페이지로 이용할거임 */}
            </div>
            {/* <div className={style.myslide_form}>
            <Myslide />
        </div> */}
            <ModalMypageContract
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                contract={selectedContract}
            />
        </div>
    );
};

export default MypageRegular;