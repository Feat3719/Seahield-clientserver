import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // 필요한 경우 추가하세요.

function AdminOnlyRoute({ children }) {
    const navigate = useNavigate();
    const userType = useSelector((state) => state.auth.userType);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // isLoggedIn 상태 추가
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        // 사용자가 로그인하지 않았거나 비즈니스 유저가 아닌 경우
        if (!isLoggedIn || userType !== "ADMIN") {
            Swal.fire({
                icon: "warning",
                title: "권한 부족",
                text: "관리자만 접근 가능합니다.",
            });
            navigate("/"); // 로그인하지 않았거나 권한이 없으면 메인 페이지로 리디렉션
        } else {
            setIsAllowed(true); // 로그인 및 권한 확인 완료
        }
    }, [isLoggedIn, userType, navigate]); // useEffect 의존성 배열 수정

    // 사용자가 로그인했고, 접근이 허용되면 자식 컴포넌트를 렌더링
    return isAllowed ? children : null;
}

export default AdminOnlyRoute;