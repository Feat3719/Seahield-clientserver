import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인이 필요합니다.",
            });
            navigate("/signin");
        } else {
            setIsAllowed(true);
        }
    }, [isLoggedIn, navigate]);
    if (!isAllowed) {
    }

    return isLoggedIn ? children : null;
}

export default ProtectedRoute;