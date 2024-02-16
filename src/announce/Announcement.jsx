// import { useState } from "react";
import style from "./Announcement.module.css";
import AnnounceList from "./AnnounceList";
import Sidenav from "../sidenav/Sidenav";
import { useSelector } from "react-redux";
import Wrapper from "../pagechange/Wrapper";

function Announcement() {
    const userType = useSelector((state) => state.auth.userType);

    return (
        <Wrapper>
            <div id={style.announceTabContainer}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>
                <div id={style.pageTitleBox}>
                    <div className={style.pageTitle}>공고 게시판</div>
                </div>

                <div id={style.listBox}>
                    <AnnounceList
                        category={"ANNOUNCE"}
                        tabName={"공고"}
                        userType={userType}
                    />
                </div>
            </div>
        </Wrapper>
    );
}

export default Announcement;
