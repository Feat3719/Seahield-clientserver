import React from "react";
import style from "./BoardUpdate.module.css";

function BoardUpdate() {
    return (
        <div id={style.container}>
            <div id={style.detail_box}>
                <table>
                    <thead>
                        <tr>
                            <th className={style.number}>번호</th>
                            <th colSpan={5} className={style.title}>
                                제목
                            </th>
                            <th className={style.writer}>작성자</th>
                        </tr>
                        <tr>
                            <th className={style.category}>분류</th>
                            <td colSpan={3} className={style.category_blank}>
                                공고
                            </td>
                            <th colSpan={2} className={style.reads}>
                                조회수
                            </th>
                            <td className={style.reads_blank}>100</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={style.content} colSpan={7}>
                                안녕하세요 반갑습니다. 저는 박준우 입니다.
                                지금은 테스트 중입니다. 셀 내용이 길어질 경우
                                테이블이 커지는 것을 방지하기 위해 옵션 테스트
                                중입니다.
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>작성일</th>
                            <td colSpan={3}>2024.02.02</td>
                            <th colSpan={2}>수정일</th>
                            <td>2024.02.02</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div id={style.button_box}>
                <button className={style.complete_button}>수정완료</button>
            </div>
        </div>
    );
}

export default BoardUpdate;
