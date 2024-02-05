import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
        } else {
            setIsAllowed(true);
        }
    }, [isLoggedIn, navigate]);
    if (!isAllowed) {
    }

    return isLoggedIn ? children : null;
}

export default ProtectedRoute;