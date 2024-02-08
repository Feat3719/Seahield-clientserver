import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

// RT로 AT 자동 재발급
const AuthManager = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Axios 인터셉터 설정
        const axiosInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // AccessToken 만료 에러 처리
                if (error.response.status === 500 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshTokenResponse = await axios.post(
                            "/api/auth/token",
                            {},
                            { withCredentials: true }
                        );
                        const newAccessToken = refreshTokenResponse.data.accessToken;
                                alert(newAccessToken)
                        // 모든 Axios 요청에 새로 갱신된 AccessToken이 포함되어 서버에 전송
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        // Refresh Token이 유효하지 않을 경우 로그인 페이지로 리디렉션
                        dispatch({ type: "LOGOUT" });
                        window.location.href = "/login";
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        // 컴포넌트 언마운트 시 인터셉터 제거
        return () => {
            axios.interceptors.response.eject(axiosInterceptor);
        };
    }, [dispatch]);

    return null;
};

export default AuthManager;