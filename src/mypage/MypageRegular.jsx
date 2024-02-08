    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import style from "./MypageRegular.module.css";
    import Myslide from "./Myslide";
    import { useSelector } from "react-redux";
    // import { type } from "@testing-library/user-event/dist/type";

    const MypageRegular = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [userInfo, setUserInfo] = useState(null);
    // const [boardInfo, setBoardInfo] = useState(null);
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userType, setUserType] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPwd, setUserPwd] = useState("");
    // const [showDetail, setShowDetail] = useState("");
    const [scene, setScene] = useState(1);

    // const [data] = useState([
    //     { id: 1, aria: "포항", name: "구룡포대보해변", ctgr: "공지" },
    //     { id: 1, aria: "포항", name: "호미곶", ctgr: "자유" },
    //     { id: 2, aria: "울산", name: "울주진하해변", ctgr: "공고" },
    // ]);
    // 예시로 했던 부분
    useEffect(() => {
        // 컴포넌트가 마운트될 때 실행되는 코드
        const fetchData = async () => {
        // 데이터 가져오기
        const data1 = [
            {
            userId_1: 1,
            userName: "John",
            userType: "일반",
            boardTitle: "여긴어디",
            },
            {
            userId_1: 1,
            userName: "John",
            userType: "일반",
            boardTitle: "난 누구?",
            },
            { userId_1: 2, userName: "Jane", userType: "사업자" },
            { userId_1: 3, userName: "Doe", userType: "일반" },
        ];

        // 데이터 필터링
        const filteredData = data1.filter((item) => item.userId_1 === 1);

        // 필터링된 데이터를 상태로 설정
        setUserInfo(filteredData);
        };

        fetchData(); // fetchData 함수 호출
    }, []); // useEffect를 한 번만 실행하기 위해 빈 배열 전달

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
            setUserAddress(response.data.userAddress);
        } else {
            alert("다시 시도해 주세요");
            window.location.href = "/";
        }
        };
        fetchData();
    }, [accessToken]);

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

    // 정보 업데이트 부분___________________________________
    const updateUserInfo = async () => {
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
            },
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            }
        );
        if (response.status === 200) {
            alert("사용자 정보가 업데이트되었습니다.");
            // 필요하다면 업데이트된 정보를 다시 가져와서 상태를 업데이트합니다.
            // fetchData();
        } else {
            alert("사용자 정보 업데이트에 실패했습니다.");
        }
        } catch (error) {
        console.error("Error updating user info:", error);
        }
    };

    // useEffect(() => {
    //     fetchData1();
    // }, []);

    const renderScene = () => {
        switch (scene) {
        case 1:
            return (
            <div>
                {/* <label >My Board List</label> */}

                <div className={style.contract_title}>
                <table className={style.my_table} style={{ left: "-18vw" }}>
                    <thead className={style.contract_title}>
                    <tr>
                        <td
                        style={{ width: "45vw", borderBottom: "black 1px solid" }}
                        className={style.my_td}
                        >
                        {" "}
                        사용자_종류{" "}
                        </td>
                        <td
                        style={{ width: "45vw", borderBottom: "black 1px solid" }}
                        className={style.my_td}
                        >
                        {" "}
                        작성자{" "}
                        </td>
                        <td
                        style={{ width: "45vw", borderBottom: "black 1px solid" }}
                        className={style.my_td}
                        >
                        {" "}
                        글 제목{" "}
                        </td>
                    </tr>
                    </thead>
                    <tbody className={style.contract_table}>
                    {userInfo &&
                        userInfo.map((item) => (
                        <tr key={item.userId_1} className={style.contract_input}>
                            <td style={{ border: "black 1px solid" }}>
                            {item.userType}
                            </td>
                            <td style={{ border: "black 1px solid" }}>
                            {item.userName}
                            </td>
                            <td style={{ border: "black 1px solid" }}>
                            {item.boardTitle}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            );
        case 2:
            return (
            <div>
                두 번째 장면입니다.
                <div style={{ justifyContent: "flex-end", position: "relative" }}>
                <p style={{ justifyContent: "end", position: "relative" }}>
                    이름:{" "}
                    <input
                    type="text"
                    value={userNickname}
                    onChange={(e) => setUserNickname(e.target.value)}
                    placeholder="새로운 이름"
                    className={style.name_input}
                    />
                </p>
                <p>
                    패스워드 :
                    <input
                    type="password"
                    value={userPwd}
                    onChange={(e) => setUserPwd(e.target.value)}
                    />
                </p>
                <p>
                    이메일 :
                    <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    />
                </p>
                <p>
                    주소 :
                    <input
                    type="text"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    />
                </p>
                </div>
                <button onClick={updateUserInfo}>수정 완료</button>
            </div>
            );

        default:
            return null;
        }
    };

    const changeScene = (newScene) => {
        setScene(newScene);
    };

    return (
        <div className={style.mypage}>
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
                <div className={style.edit_1}>{renderScene()}</div>

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
                    {/* <div className={style.info_edit}>
                        <p>
                        이름:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="새로운 이름"
                            className={style.name_input}
                        />
                        </p>
                        <p>
                        패스워드 :
                        <input
                            type="password"
                            value={userPwd}
                            onChange={(e) => setUserPwd(e.target.value)}
                        />
                        </p>
                        <p>
                        이메일 :
                        <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        </p>
                        <p>
                        주소 :
                        <input
                            type="text"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                        />
                        </p>
                    </div> */}

                    <div>{/* <button type="submit">정보 수정</button> */}</div>
                    </div>
                </form>
                {/* <button onClick={updateUserInfo}>정보 수정</button> */}
                <button onClick={() => changeScene(1)}>1번 장면으로</button>
                <button onClick={() => changeScene(2)}>2번 장면으로</button>
                {/* <button onClick={handleShowDetail}>정보 상세</button> */}
                </div>
                {/* // ) : (
                    
                        // )} */}
            </div>

            {/* <div className={style.my_board}>
                    <div className={style.contract}>
                    <label>My Board List</label>

                    <div className={style.contract_title}>
                        <table>
                        <thead className={style.contract_title}>
                            <tr>
                            <td style={{ width: "40vw", border: " 1px solid" }}>
                                {" "}
                                사용자_종류{" "}
                            </td>
                            <td style={{ width: "40vw", border: "1px solid" }}>
                                {" "}
                                작성자{" "}
                            </td>
                            <td style={{ width: "40vw", border: " 1px solid" }}>
                                {" "}
                                글 제목{" "}
                            </td>
                            </tr>
                        </thead>
                        <tbody className={style.contract_table}>
                            {userInfo &&
                            userInfo.map((item) => (
                                <tr
                                key={item.userId_1}
                                className={style.contract_input}
                                >
                                <td style={{ border: "white 1px solid" }}>
                                    {item.userType}
                                </td>
                                <td style={{ border: "white 1px solid" }}>
                                    {item.userName}
                                </td>
                                <td style={{ border: "white 1px solid" }}>
                                    {item.boardTitle}
                                </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div> */}

            <div className={style.myslide_form}>
                <Myslide />
            </div>

            {/* <div className={style.edit_1}>{renderScene()}</div> */}
            </div>
        )}
        {/* 여기까지 일반인 페이지 조건만 바꾸면 됨 */}

        <div className={style.mypage}>
            {/* 사업자페이지로 쓸부분 */}
            {userType !== "일반" && (
            <div className={style.my_form}>
                <h1 className={style.my_title}>마이 페이지_사업자</h1>

                <div className={style.my_info}>
                <div>
                    <h2 className={style.my_info_name}>{userNickname}님 정보</h2>
                </div>

                <div className={style.my_input_wrapper_1}>
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
                        {/* 정보 수정 부분___일단 주석____되는거 확인됨_____ */}
                        {/* <div>
                                <p>
                                    이름:{" "}
                                    <input
                                    type="text"
                                    value={userNickname}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="새로운 이름"
                                    className={style.name_input}
                                    />
                                </p>
                                <p>
                                    패스워드 :
                                    <input
                                    type="password"
                                    value={userPwd}
                                    onChange={(e) => setUserPwd(e.target.value)}
                                    />
                                </p>
                                <p>
                                    이메일 :
                                    <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                </p>
                                <p>
                                    주소 :
                                    <input
                                    type="text"
                                    value={userAddress}
                                    onChange={(e) => setUserAddress(e.target.value)}
                                    />
                                </p>
                                </div> */}
                    </div>
                    </form>
                    {/* <button onClick={updateUserInfo}>정보 수정</button> */}
                    {/* <button onClick={handleShowDetail}>내정보 상세보기</button> */}

                    <div>
                    {/* 장면에 따라 다른 JSX를 렌더링합니다. */}
                    {/* {renderScene()} */}
                    {/* 장면 변경 버튼을 추가합니다. */}
                    <button onClick={() => changeScene(1)}>1번 장면으로</button>
                    <button onClick={() => changeScene(2)}>2번 장면으로</button>
                    </div>
                </div>
                </div>
                <div className={style.edit_1}>{renderScene()}</div>
            </div>
            )}
            {/* 일반 조건 마감부분 --> 이 부분 사업자 페이지로 이용할거임 */}
        </div>
        </div>
    );
    };

    export default MypageRegular;
