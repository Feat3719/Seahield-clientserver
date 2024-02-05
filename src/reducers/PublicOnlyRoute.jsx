import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const location = useLocation();

    useEffect(() => {
        if (isLoggedIn) {
            if (location.pathname === "/login") {
                navigate("/");
            } else {
                alert("이미 로그인된 상태입니다.");
                navigate("/");
            }
        }
    }, [isLoggedIn, navigate, location.pathname]);

    return !isLoggedIn ? children : null;
};

export default PublicOnlyRoute;