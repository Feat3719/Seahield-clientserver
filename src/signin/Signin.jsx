import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidenav from "../sidenav/Sidenav";
import Loading from "../loading/Loading";
import style from "./Signin.module.css";
import { Link, useNavigate } from "react-router-dom"; // useNavigate를 import
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Wrapper from "../pagechange/Wrapper";
import { useDispatch } from "react-redux";

function Signin() {
    const [userid, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberUsername, setRememberUsername] = useState(false);
    const navigate = useNavigate(); // useNavigate hook을 사용하여 navigation 인스턴스에 접근
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리를 위한 상태 변수 추가

    useEffect(() => {
        // 컴포넌트가 마운트될 때 localStorage에서 저장된 userid을 가져옵니다.
        const savedUserId = localStorage.getItem("rememberedUserId");
        if (savedUserId) {
            setUserId(savedUserId);
            setRememberUsername(true);
        }
    }, []);

    const loginBtn = useCallback(async () => {
        setIsLoading(true); // 로그인 시작 시 로딩 상태를 true로 설정
        try {
            const response = await axios.post(
                "/api/auth/signin",
                {
                    userId: userid,
                    userPwd: password,
                },
                { withCredentials: true }
            );
            alert("response.data.accessToken")
            alert("response.data.expiresIn")
            if (response.status === 201) {
                const userIdInClient = userid;
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: userIdInClient,
                        accessToken: response.data.accessToken,
                        userType: response.data.userType,
                        expiration: response.data.expiresIn,
                    },
                });

                Swal.fire({
                    icon: "success",
                    title: "로그인 성공",
                    text: "환영합니다!",
                }).then((result) => {
                    // 로그인 성공 시 아이디 저장
                    if (result.isConfirmed || result.isDismissed) {
                        // 로그인 성공 시 아이디 저장
                        if (rememberUsername) {
                            localStorage.setItem("rememberedUserId", userid);
                        } else {
                            localStorage.removeItem("rememberedUserId");
                        }
                        navigate("/map"); // 페이지 이동
                        return;
                    }
                });
            } else if (response.status === 404) {
                if (
                    response.data.message === "사용자를 찾을 수 없음" ||
                    response.data.message === "비밀번호가 일치하지 않습니다."
                ) {
                    Swal.fire({
                        icon: "error",
                        title: "로그인 실패",
                        text: response.data.message,
                    });
                    setIsLoading(false);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "오류 발생",
                        text: "오류가 발생했습니다. 다시 시도해주세요.",
                    });
                }
                setIsLoading(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "로그인 실패",
                    text: "다시 로그인 해주세요.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "로그인 실패",
                text: "아이디를 확인해주세요",
            });
            setIsLoading(false);
        } finally {
            setIsLoading(false); // 로그인 요청이 완료되면 로딩 상태를 false로 설정
        }
    }, [userid, password, setIsLoading, dispatch, navigate, rememberUsername]); // 의존성 배열에 필요한 변수들을 추가

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    //엔터 키
    useEffect(() => {
        // 컴포넌트가 마운트될 때 키보드 이벤트 리스너를 추가합니다.
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                loginBtn();
            }
        };

        window.addEventListener("keypress", handleKeyPress);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [loginBtn]); // 의존성 배열에 필요한 변수들을 추가

    return (
        <>
            {isLoading && <Loading />}
            <Wrapper>
                <div className={style.signin}>
                    <div className={style.signin_nav}>
                        <Sidenav />
                    </div>

                    <motion.div
                        className={style.signin_area}
                        initial={{ y: -250, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className={style.signin_title}>로그인</h1>

                        <div className={style.signin_form}>
                            <input
                                type="text"
                                placeholder="아이디"
                                value={userid}
                                onChange={(e) => setUserId(e.target.value)}
                                className={style.signin_input}
                            />
                            <div className={style.password_container}>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={style.signin_input}
                                />
                                <img
                                    src={
                                        passwordVisible
                                            ? `${process.env.PUBLIC_URL}/images/eye1.svg`
                                            : `${process.env.PUBLIC_URL}/images/eye2.svg`
                                    }
                                    className={style.eye_icon}
                                    onClick={togglePasswordVisibility}
                                    alt="Toggle password visibility"
                                />
                            </div>

                            <div className={style.remember_container}>
                                <input
                                    id="rememberUsername"
                                    type="checkbox"
                                    checked={rememberUsername}
                                    onChange={(e) => setRememberUsername(e.target.checked)}
                                    className={style.remember_checkbox}
                                />
                                <label
                                    htmlFor="rememberUsername"
                                    className={style.remember_label}
                                >
                                    아이디 저장하기
                                </label>
                            </div>

                            <div className={style.links}>
                                <Link to="/idfind?type=idFind" className={style.link}>
                                    아이디 찾기
                                </Link>
                                <p className={style.bar}>|</p>
                                <Link to="/idfind?type=passwordChange" className={style.link}>
                                    비밀번호 찾기
                                </Link>
                            </div>

                            <div onClick={loginBtn} className={style.signin_button}>
                                로그인
                            </div>
                            <Link to="/signupver" className={style.signup_button}>
                                회원가입
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </Wrapper>
        </>
    );
}

export default Signin;