import React from "react";
import style from "./Board.module.css";

function Board() {
    return (
        <div className="wrapper">
            <div className="list-wrapper">
                <div className="list">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Writer</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>제목 예시</td>
                                <td>작성자 예시</td>
                                <td>2024-01-30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Board;
