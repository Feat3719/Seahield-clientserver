import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const AuthManager = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let refreshTimer;

        // 토큰 갱신을 예약하는 함수
        const scheduleTokenRefresh = (expiresIn) => {
            clearTimeout(refreshTimer);
            // 실제 토큰 만료 3분 전에 토큰 갱신 예약
            refreshTimer = setTimeout(refreshToken, (expiresIn - 180) * 1000);
        };

        // 토큰 갱신 함수
        const refreshToken = async () => {
            try {
                const refreshTokenResponse = await axios.post("/api/auth/token", {}, { withCredentials: true });
                const { accessToken, expiresIn } = refreshTokenResponse.data;

                // Axios 헤더 업데이트
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                // 필요한 경우 Redux 스토어에서 상태 업데이트를 위해 액션 디스패치
                dispatch({
                    type: "REFRESH_TOKEN_SUCCESS",
                    payload: {
                        accessToken,
                    },
                });

                // 다음 토큰 갱신 예약
                scheduleTokenRefresh(expiresIn);
            } catch (error) {
                console.error("토큰 갱신 실패:", error);
                dispatch({ type: "LOGOUT" });
                window.location.href = "/login";
            }
        };

        // 초기 토큰 갱신 예약
        // 로그인 후 expiresIn을 Redux 스토어나 localStorage에 저장한다고 가정
        // 여기서는 간단히 localStorage에 저장된 것으로 가정
        const expiresIn = localStorage.getItem("expiresIn");
        if (expiresIn) {
            scheduleTokenRefresh(expiresIn - Date.now() / 1000);
        }

        // 401 Unauthorized 응답을 전역적으로 처리하기 위한 Axios 인터셉터
        const axiosInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401 && !error.config._retry) {
                    // 401 응답에 대한 특정 처리가 필요한 경우
                }
                return Promise.reject(error);
            }
        );

        // 정리 함수에서 타이머와 인터셉터 제거
        return () => {
            clearTimeout(refreshTimer);
            axios.interceptors.response.eject(axiosInterceptor);
        };
    }, [dispatch]);

    return null;
};

export default AuthManager;