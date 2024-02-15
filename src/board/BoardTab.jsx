import { useState } from "react";
import style from "./BoardTab.module.css";
import BoardList from "./BoardList";
import Sidenav from "../sidenav/Sidenav";
import { useSelector } from "react-redux";
import Wrapper from "../pagechange/Wrapper";

function BoardTab() {
    const tabData = [
        { id: 1, content: "자유게시판" },
        { id: 2, content: "질문게시판" },
        { id: 3, content: "공지사항" },
    ];

    const userType = useSelector((state) => state.auth.userType);
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const tabClickHandler = (tabId) => {
        setActiveTab(tabId);
        console.log(`${tabId}번 탭이 클릭됨`);
    };

    return (
        <Wrapper>
            <div id={style.boardTabContainer}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>
                <div id={style.tabBox}>
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
                </div>

                <div id={style.listBox}>
                    {activeTab === 1 && (
                        <BoardList
                            category={"FREE"}
                            tabName={tabData[0].content}
                            userType={userType}
                        />
                    )}
                    {activeTab === 2 && (
                        <BoardList
                            category={"QNA"}
                            tabName={tabData[1].content}
                            userType={userType}
                        />
                    )}
                    {activeTab === 3 && (
                        <BoardList
                            category={"NOTICE"}
                            tabName={tabData[2].content}
                            userType={userType}
                        />
                    )}
                </div>
            </div>
        </Wrapper>
    );
}

export default BoardTab;
