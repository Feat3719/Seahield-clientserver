import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../sidenav/Sidenav.module.css";
import Swal from "sweetalert2";

function LogOutBtn() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();

    const handleLogout = async () => {
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
        }
    };

    return (
        <span className={style.itemTxt} onClick={handleLogout}>
            로그아웃
        </span>
    );
}

export default LogOutBtn;