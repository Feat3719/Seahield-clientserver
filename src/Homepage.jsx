import React from 'react';
import style from './Homepage.module.css'

function Homepage() {
    return (
        <div className={style.home_box}> 
            <div className={style.home_box_2}>
                <div className={style.sub_1}>

                    <div className={style.sub_1_1}> 메인_서브_1_1</div>
                    
                    <div className={style.sub_1_2}>메인_서브_1_2
                        <table border="1" cellspacing="0" > 
                            <tr>
                                <th>인덱스번호</th>
                                <th>제목</th>
                            </tr>
                            <tr>
                                <td>번호</td>
                                <td>내용</td>
                            </tr>
                        
                        </table>
                    </div>
            
                </div>
                <div className={style.sub_2}> 가운데</div>
            </div>
        </div>
    )
}

export default Homepage;