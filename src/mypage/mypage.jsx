import React, {useState,useEffect} from "react";
import axios from "axios";
import style from "./Mypage.module.css";

const Mypage = ()=> {
    const [username, setUsername_1] = useState('')
    const [email, setEmail_1] = useState('')
    const [usertype, setUserType_1] = useState('')

    const [data] = useState([
        {id : 1, aria:'포항',name:'구룡포대보해변'}
    ])
    // const isBusinessUser = queryParams.get('isBusinessUser') === 'true';
    // const [userRole, setUserRole] = useState('');

    useEffect( ()=> {
        axios.get('./api/mypage')
        .then(response => {
            setUsername_1(response.data.userName)
            setEmail_1(response.data.userEmail)
            setUserType_1(response.data.userType)
        })
        .catch(error => {
            console.error('API 요청 실패:', error)    
    })
} , [])

    // useEffect( () => {
    
    // },[] )





    return (
        




        <div className={style.mypage}>
            <div className={style.my_info}> 

            <h1>마이 페이지</h1>
            {/* {userRole === 'ADMIN' && (
            <p>관리자 페이지</p>
            )} */}
            {/* <p>사용자 이름: 
                {username}
                </p> */}
                    <div className={style.my_input_wrapper}>
                        <div className={style.mypage_title}>
                            <label className={style.my_input_label}>아이디</label>
                                <input
                                    type="text"
                                    placeholder={username}
                                    value={username}
                                    className={style.mypage_input}
                                    disabled="True"
                                />
                        </div>
                        <div className={style.mypage_title}>
                            <label className={style.my_input_label}>사용자 이메일 </label>
                                <input
                                    type="text"
                                    placeholder={email}
                                    value={email}
                                    className={style.mypage_input}
                                    disabled="True"
                                />
                        </div>
                        <div className={style.mypage_title}>
                            <label className={style.my_input_label}>사용자 유형 </label>
                                <input
                                    type="text"
                                    // placeholder={usertype}
                                    value={usertype}
                                    className={style.mypage_input}
                                    disabled="True"
                                />
                        </div>
                    </div>

                    <div className={style.contract}> 
                        <label>예약 내역</label>
                        
                        <div className={style.contract_title}>
                            <table>
                                <thead className={style.contract_title}>
                                    <tr>
                                        <td style={{width : '20vw', border:"red 1px solid"}}> hi </td>
                                        <td style={{width : '20vw', border:"red 1px solid"}}> hello </td>
                                    </tr>
                                </thead>
                                <tbody className={style.contract_table}>
                                    {data.map( (item) => (
                                        <tr key={item.id}
                                        className={style.contract_input}>
                                            <td> 
                                                {/* <input className={style.contract_input}
                                                type="text" 
                                                placeholder="담당 지역 명"
                                                disabled="True"
                                                />  */}
                                                {item.aria}
                                            </td>
                                            <td>
                                                {item.name}
                                                {/* <input className={style.contract_input}
                                                    type="text" 
                                                    value={username} // 구역이름으로 수정해야함
                                                    placeholder="담당 구역"
                                                    disabled="True"
                                                /> */}
                                            </td>
                                        </tr>
                                    )
                                    )}
                                        
                                </tbody>

                            </table>


                            {/* <input className={style.contract_input}
                                    type="text" 
                                    placeholder="담당 지역 명"
                                    disabled="True"
                                    />
                            <input className={style.contract_input}
                                    type="text" 
                                    placeholder="담당 구역"
                                    disabled="True"
                                    /> */}
                        </div>
                    </div>



            
            
            </div>
        



        </div>


    )

};

export default Mypage;