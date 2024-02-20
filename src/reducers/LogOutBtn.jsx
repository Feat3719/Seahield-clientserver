import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../sidenav/Sidenav.module.css";
import Swal from "sweetalert2";
import Loading from "../loading/Loading";

function LogOutBtn() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const expiration = useSelector((state) => state.auth.expiration);
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // handleLogout 함수에 useCallback 적용
    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true)
        try {
            if (accessToken.length > 0) {
                await axios.post("/api/auth/signout", {}, { withCredentials: true });
                dispatch({ type: "LOGOUT" });
                navigate("/");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "잘못된 접근입니다.",
                });
                dispatch({ type: "LOGOUT" });
                navigate("/");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "서버 오류",
                text: "다시 시도해 주시기 바랍니다.",
            });
        } finally {
            setIsLoggingOut(false); // 로그아웃 완료
        }
    }, [accessToken, dispatch, navigate]);

    useEffect(() => {
        let logoutTimer;
        if (accessToken.length > 0 && expiration) {
            const signOutTimer = expiration * 1000;

            logoutTimer = setTimeout(() => {
                handleLogout();
                Swal.fire({
                    title: "토큰 만료",
                    text: "다시 로그인 해주세요",
                    icon: "warning",
                    confirmButtonText: "확인",
                });
                navigate("/");
            }, signOutTimer);
        }

        return () => clearTimeout(logoutTimer); // 컴포넌트 언마운트 시 타이머 제거
    }, [expiration, handleLogout, navigate, accessToken.length]); // 의존성 배열에 handleLogout 추가

    return (
        <>
            {isLoggingOut ? <Loading /> : null} {/* 로그아웃 중일 때 Loading 컴포넌트를 렌더링 */}
            <span className={style.logout} onClick={handleLogout}>
                로그아웃
            </span>
        </>
    );
}

export default LogOutBtn;