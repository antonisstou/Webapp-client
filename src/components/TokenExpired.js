import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation} from 'react-router-dom';
import React, { useEffect } from "react";


function TokenExpired() {

    const navigate = useNavigate();

    let location = useLocation();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const decodedJwt = jwtDecode(user.token);
          if (decodedJwt.exp * 1000 < Date.now()) {
            localStorage.removeItem("user")
            navigate("/bookmanager/auth/authenticate")
          }
        }
      }, [location, navigate]);

    return (
        <></>
    );
}

export default TokenExpired;
