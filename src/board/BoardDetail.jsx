import React from "react";
import style from "./BoardDetail.module.css";

function BoardDetail() {
    return (
        <div id={style.container}>
            <div id={style.detail_box}>
                <table>
                    <thead>
                        <tr>
                            <td className={style.number}>번호</td>
                            <td className={style.title}>제목</td>
                            <td className={style.writer}>작성자</td>
                        </tr>
                        <tr>
                            <td className={style.category}>분류</td>
                            <td className={style.category_blank}></td>
                            <td className={style.reads}>조회수</td>
                            <td className={style.reads_blank}></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>내용</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <td>작성일</td>
                            <td>수정일</td>
                        </tr>
                    </thead>
                </table>
                {/* <div id={style.head}>
                    <div id={style.head_1}>
                        <div className={style.number}>번호</div>
                        <div className={style.title}>제목</div>
                        <div className={style.writer}>작성자</div>
                    </div>
                    <div id={style.head_2}>
                        <div id={style.category}>분류</div>
                        <div id={style.reads}>조회수</div>
                    </div>
                </div>
                <div id={style.content}>
                    <div>내용</div>
                </div>
                <div id={style.footer}>
                    <div>작성일</div>
                    <div>최종 수정일</div>
                </div> */}
            </div>
            <div id={style.button_box}>
                <button>수정</button>
                <button>삭제</button>
                <button>댓글달기</button>
            </div>
            <div id={style.comment_box}>댓글</div>
        </div>
    );
}

export default BoardDetail;
