import React from "react";
import style from "./BoardDetail.module.css";

function BoardDetail() {
    return (
        <div id={style.container}>
            <div id={style.detail_box}>
                <table>
                    <thead>
                        <tr>
                            <th className={style.number}>번호</th>
                            <th className={style.title}>제목</th>
                            <th colSpan={2} className={style.writer}>
                                작성자
                            </th>
                            <th></th>
                        </tr>
                        <tr>
                            <th className={style.category}>분류</th>
                            <td className={style.category_blank}></td>
                            <th className={style.reads}>조회수</th>
                            <td className={style.reads_blank}></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4}>내용</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>작성일</th>
                            <td></td>
                            <th>수정일</th>
                            <td></td>
                        </tr>
                    </tfoot>
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
