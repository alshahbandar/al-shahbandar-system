import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase-simple";
import { useNavigate } from "react-router-dom";

const AutoLogin = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [user, loading, navigate]);

  return null;
};

export default AutoLogin;
