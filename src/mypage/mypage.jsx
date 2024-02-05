import React, {useState,useEffect} from "react";
import axios from "axios";
import style from "./Mypage.module.css";

const Mypage = ()=> {
    const [username, setUsername_1] = useState('')
    const [email, setEmail_1] = useState('')
    const [usertype, setUserType_1] = useState('')
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
            <div className={style.mypage_form}> 

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


                    </div>
            
            
            </div>
        



        </div>


    )

};

export default Mypage;