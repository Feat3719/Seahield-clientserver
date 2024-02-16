import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./MypageRegular.module.css";
import Myslide from "./Myslide";
import DaumPost from "../daumpost/DaumPost";
import { useSelector } from "react-redux";
import Sidenav from "../sidenav/Sidenav";
import MyEditPrev from "./MyEditPrev";
import { Link } from "react-router-dom";

const MypageRegular = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userType, setUserType] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [isPwdValid, setIsPwdValid] = useState(false); // 비밀번호 유효성 상태
    const [userContact, setUserContact] = useState("");
    const [companyRegistNum, setCompanyRegistNum] = useState("");

    const [scene, setScene] = useState(1);
    const [posts, setPosts] = useState([]);
    // const [articleCtgr, setArticleCtgr] = useState("");
    // const [articleTitle, setArticleTitle] = useState("");

    const [contractStatus, setContractStatus] = useState("");
    const [announceName, setAnnounceName] = useState("");
    // const [contract, setContract] = useState("");
    const [reenteredPwd, setReenteredPwd] = useState("");
    const [pwdMatch, setPwdMatch] = useState(true);

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





    //계약 항목 조회
    useEffect(() => {
    const contractDetail = async() => {
        try {
            const response = await axios.get('/api/contract/details/102',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    },
            }
            )
            console.log("트롸이!");
            alert("1번 통과")

                if (response.status === 200) {
                    setContractStatus(response.data.contractStatus)
                    setAnnounceName(response.data.announceName)
                    // setContract(response.data)
                }
            console.log("트롸잇!");

        } catch(error) {
            console.error("삐용삐용 에러! 에러!", error)
        }
        
    }
    contractDetail();
    
    },[accessToken]);


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
                                <td style={{ width: "45vw" }} className={style.my_td}> 사용자_종류 </td>
                                <td style={{ width: "45vw", borderBottom: "black 1px solid" }} className={style.my_td}> 글 유형 </td>
                                <td style={{ width: "45vw", borderBottom: "black 1px solid" }} className={style.my_td}> 글 제목 </td>
                            </tr>
                        </thead>
                        <tbody className={style.contract_table}>
                            {/* {posts.map(post => (
                            <li key={post.articleTitle}>{post.articleTitle}</li>
                            ))} */}
                            {posts.map((post, index) => (
                                <tr key={index}>
                                    <td>{userType}</td>
                                    <td>{post.articleCtgr}</td>
                                    <td>
                                        <Link to={`/boarddetail/${post.articleId}`}>
                                            {post.articleTitle}
                                        </Link>
                                    </td>
                                </tr>
                            ))}

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
                                    <td style={{ width: "45vw" }} className={style.my_td}>관할 지차제</td>
                                    <td style={{ width: "45vw", borderBottom: "black 1px solid" }} className={style.my_td}>공고명</td>
                                    <td style={{ width: "45vw", borderBottom: "black 1px solid" }} className={style.my_td}>승인여부</td>
                                </tr>
                            </thead>
                            <tbody className={style.contract_table}>
                                {/* 예제 데이터 또는 상태 변수를 매핑 */}
                                <tr>
                                    <td className={style.my_td}>{userType}</td> {/* 관할 지차제 정보, 예시로 userType 사용 */}
                                    <td className={style.my_td}>{announceName}</td> {/* 공고명 */}
                                    <td className={style.my_td}>{contractStatus}</td> {/* 승인여부 */}
                                </tr>
                                {/* 더 많은 행을 매핑하려면 여기에 반복문을 사용 */}
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
                            <h2 className={style.my_info_name}>{userId}님 환영합니다.</h2>
                        </div>
                        {/* {userId ? ( */}
                        <div className={style.my_input_wrapper_1}>
                            {scene !== 0 && <div className={style.edit_1}>{renderScene()}</div>}

                            <form onSubmit={updateUserInfo}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
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
                <button className={style.transBtn} onClick={() => changeScene(2)}>2번 장면으로(정보수정)</button>
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
                            <div className={style.my_info_namearea}>
                                <h2 className={style.my_info_name}>{userNickname}님 <br></br>환영합니다.</h2>
                            </div>

                            <div className={style.my_input_wrapper_1}>
                                {scene !== 0 && <div className={style.edit_1}>{renderScene()}</div>}
                                <form onSubmit={updateUserInfo}>
                                    <div className={style.userinfo_id}>
                                        <p>아이디 : {userId}</p>
                                        <p>이름 : {userNickname}</p>
                                        <p>유형 : {userType}</p>
                                    </div>
                                </form>
                                {/* <button onClick={updateUserInfo}>정보 수정</button> */}
                                {/* <button onClick={handleShowDetail}>내정보 상세보기</button> */}

                    <div>
                    {/* 장면에 따라 다른 JSX를 렌더링합니다. */}
                    {/* {renderScene()} */}
                    {/* 장면 변경 버튼을 추가합니다. */}
                    <button className={style.transBtn} onClick={() => changeScene(1)}>1번 장면으로(내가 쓴글)</button>
                    <button className={style.transBtn} onClick={() => changeScene(2)}>2번 장면으로(그냥수정)</button>
                    <button className={style.transBtn} onClick={() => changeScene(3)}>3번 장면으로(계약관련)</button>
                    <button className={style.transBtn} onClick={() => changeScene(4)}>4번 장면으로(수정전비번확인)</button>
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
        </div>
    );
};

export default MypageRegular;
