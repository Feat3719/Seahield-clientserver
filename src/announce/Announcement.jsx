// import { useState } from "react";
import style from "./Announcement.module.css";
import AnnounceList from "./AnnounceList";
import Sidenav from "../sidenav/Sidenav";
import { useSelector } from "react-redux";

function Announcement() {
    const userType = useSelector((state) => state.auth.userType);

    // const tabData = [
    //     { id: 1, content: "자유게시판" },
    //     { id: 2, content: "질문게시판" },
    //     { id: 3, content: "공지사항" },
    //     { id: 4, content: "공고" },
    // ];
    // const [activeTab, setActiveTab] = useState(tabData[3].id);

    // const tabClickHandler = (tabId) => {
    //     setActiveTab(tabId);
    //     console.log(`${tabId}번 탭이 클릭됨`);
    // };

    return (
        <div id={style.boardTabContainer}>
            <div className={style.login_nav}>
                <Sidenav />
            </div>
            <div id={style.pageTitleBox}>
                <div className={style.pageTitle}>공고 게시판</div>
            </div>
            {/* <div id={style.tabBox}>
                <ul id={style.tab}>
                    {tabData.map((tab) => {
                        const tabClass =
                            tab.id === activeTab ? style.active : "";
                        return (
                            <li
                                key={tab.id}
                                onClick={() => {
                                    tabClickHandler(tab.id);
                                }}
                                className={`${style.tab} ${tabClass}`}
                            >
                                {tab.content}
                            </li>
                        );
                    })}
                </ul>
            </div> */}

            <div id={style.listBox}>
                {/* {activeTab === 1 && (
                    <BoardList category={"FREE"} tabName={tabData[0].content} />
                )}
                {activeTab === 2 && (
                    <BoardList category={"QNA"} tabName={tabData[1].content} />
                )}
                {activeTab === 3 && (
                    <BoardList
                        category={"NOTICE"}
                        tabName={tabData[2].content}
                    />
                )} */}
                {/* {activeTab === 4 && ( */}
                <AnnounceList
                    category={"ANNOUNCE"}
                    tabName={"공고"}
                    userType={userType}
                />
                {/* )} */}
            </div>
        </div>
    );
}

export default Announcement;
