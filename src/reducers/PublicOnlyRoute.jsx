import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PublicOnlyRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      if (location.pathname === "/signin") {
        navigate("/");
      } else {
        Swal.fire({
          icon: "warning",
          title: "접근 제한",
          text: "이미 로그인된 상태입니다.",
        });
        navigate("/");
      }
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return !isLoggedIn ? children : null;
};

export default PublicOnlyRoute;